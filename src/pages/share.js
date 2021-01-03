import db from 'app/database';
import { CritterBlock } from 'components/critters/Critter';
import { graphql } from 'gatsby';
import lzstring from 'lz-string';
import qrcode from 'qrcode-generator';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { navigate } from 'gatsby';

// require('@tensorflow/tfjs-backend-cpu');
// require('@tensorflow/tfjs-backend-webgl');
// const cocoSsd = require('@tensorflow-models/coco-ssd');

// async function predict(img) {
//   const model = await cocoSsd.load({
//     modelUrl: '/tfmodel/model.json',
//   });
//   const predictions = await model.detect(img);
//   console.log({ predictions });
//   return predictions;
// }

const WebVideo = ({ onData }) => {
  const canvasRef = useRef();
  const devices = typeof navigator !== 'undefined' && navigator.mediaDevices;

  useEffect(() => {
    const video = document.createElement('video');
    if (!canvasRef) return;
    let stop = false;

    if (!devices) return;

    const canvas = canvasRef.current;
    const c = canvas.getContext('2d');

    const tick = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        c.drawImage(video, 0, 0, canvas.width, canvas.height);
        let imageData = c.getImageData(0, 0, canvas.width, canvas.height);

        // predict(imageData).then(predictions => {
        //   predictions.forEach(prediction => {
        //     const b = prediction.bbox;
        //     c.beginPath();
        //     c.moveTo(b[0], b[1]);
        //     c.lineTo(b[0]+ b[2], b[1]);
        //     c.lineTo(b[0] + b[2], b[1] + b[3]);
        //     c.lineTo(b[0], b[1] + b[3]);
        //     c.lineTo(b[0], b[1]);
        //     c.font = '24px sans-serif';
        //     c.fillText(prediction.class, b[0] + 20, b[1] + 20);
        //     c.lineWidth = 4;
        //     c.strokeWidth = '#aa66ce';
        //     c.stroke();
        //     // c.endPath();
        //   });
        // });

        import('jsqr')
          .then(module => module.default)
          .then(jsqr => {
            const code = jsqr(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'dontInvert',
            });

            if (code) {
              const l = code.location;
              const spreadXY = loc => [loc.x, loc.y];
              c.beginPath();
              c.moveTo(...spreadXY(l.topLeftCorner));
              c.lineTo(...spreadXY(l.topRightCorner));
              c.lineTo(...spreadXY(l.bottomRightCorner));
              c.lineTo(...spreadXY(l.bottomLeftCorner));
              c.lineTo(...spreadXY(l.topLeftCorner));
              c.lineWidth = 4;
              c.strokeStyle = '#aa66ce';
              c.stroke();
              if (code.data) {
                let data = lzstring.decompressFromBase64(code.data);
                onData(data);
              }
            }
          });
      }
      if (stop) return;
      // setTimeout(tick, 1000 / 5);
      requestAnimationFrame(tick);
    };
    devices.getUserMedia({ video: { facingMode: 'environment' } }).then(stream => {
      video.srcObject = stream;
      video.setAttribute('playsinline', true);
      video.play();
      requestAnimationFrame(tick);
    });

    return () => {
      stop = true;
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
        video.srcObject = null;
      }
    };
  }, [devices, onData]);

  return <canvas style={{ maxWidth: '100%' }} ref={canvasRef} />;
};

const NotFoundPage = props => {
  const availableCritters = useMemo(() => props.data.allCrittersJson.edges.map(edge => edge.node), [
    props.data.allCrittersJson.edges,
  ]);

  const [QrTag, setQrTag] = useState();
  const [data, setData] = useState({});
  useEffect(() => {
    db.caught.toArray(caught => {
      const qr = qrcode(0, 'L');

      let data = JSON.stringify({
        c: caught.map(c => `${c.type[0]}${c.no}`).join(''),
      });

      const compressed = lzstring.compressToBase64(data);
      qr.addData(compressed);
      qr.make();
      setQrTag(qr.createSvgTag({ scalable: true }));
    });
  }, []);

  const onData = str => {
    const data = JSON.parse(str);
    const caught = data.c
      .replace(/(\d+)([a-zA-Z])/g, '$1,$2')
      .replace(/([a-zA-Z])(\d+)/g, '$1=$2')
      .split(',')
      .map(p => p.split('='))
      .map(p => ({ no: +p[1], type: p[0] === 'b' ? 'bug' : 'fish' }));
    const caughtCritters = caught.map(c =>
      availableCritters.find(critter => critter.no === c.no && critter.type === c.type)
    );

    setData({ critters: caughtCritters, caught });
  };

  const onSave = () => {
    db.caught.bulkPut(data.caught);
    navigate('/');
  };

  return (
    <Layout>
      <SEO title='Data' />
      {!data.critters && (
        <section>
          <h2>Heres all your Blathadex Data</h2>
          <div style={{ margin: 'auto' }} dangerouslySetInnerHTML={{ __html: QrTag }} />
          <div>{/* <input type='file' label='Restore Data' /> */}</div>
          <WebVideo onData={onData} />
        </section>
      )}
      {data.critters && (
        <section>
          <h2>Do you want to save this?</h2>
          <div className='grid'>
            {data.critters.map(critter => (
              <CritterBlock key={critter.id} {...critter} caught />
            ))}
          </div>
          <nav data-mobile className='bottom'>
            <header>
              <button className='error' onClick={() => navigate('/')}>
                Cancel
              </button>
              <button className='success' onClick={onSave}>
                Save
              </button>
            </header>
          </nav>
        </section>
      )}
    </Layout>
  );
};

export default NotFoundPage;

export const query = graphql`
  query {
    allCrittersJson {
      edges {
        node {
          bells
          name
          no
          id
          etime
          etime2
          smonth
          smonth2
          stime
          stime2
          type
          size
          loc
          emonth2
          emonth
          desc
        }
      }
    }
  }
`;
