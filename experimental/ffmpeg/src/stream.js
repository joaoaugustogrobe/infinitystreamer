const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');

let queue = [];
let isStreaming = false;

function addToQueue(filename) {
  queue.push(filename);
  if (!isStreaming) {
    processQueue();
  }
}

function removeFromQueue(filename) {
  const index = queue.indexOf(filename);
  if (index > -1) {
    queue.splice(index, 1);
  }
}

let i = 1;

async function processQueue() {
  console.log('processQueue', queue);
  if (queue.length > 0) {
    isStreaming = true;
    const currentFile = queue.shift();
    await streamFile(currentFile);
    processQueue();
  } else {
    isStreaming = false;
  }
}

function streamFile(file) {
  return new Promise((resolve, reject) => {
    const inputPath = path.resolve(__dirname, '..', 'resources', file);
    const rtmpUrl = process.env.RTMP_URL;

    if (!fs.existsSync(inputPath)) {
      console.error(`File not found: ${inputPath}`);
      return reject(new Error(`File not found: ${inputPath}`));
    }

    ffmpeg(inputPath)
    .inputOptions(['-r 30'])
    .videoFilters('scale=1280:960')
    .videoCodec('libx264')
    .addOptions([
      '-profile:v baseline',
      '-pix_fmt yuv420p',
      '-f flv',
    ])
    // .output('rtmp://localhost/live/test')
    .output(rtmpUrl)
    .on('start', (command) => {
      console.log(`Streaming ${file} started`)
    })
    .on('end', () => {
      console.log(`Streaming ${file} finished`);
      resolve();
    })
    .on('error', (err) => {
      console.error(`Error streaming ${file}: ${err.message}`);
      reject(err);
    })
    .run();

  });
}
// addToQueue(`${i}.mp4`);

var dir = './resources/'; // your directory

var files = fs.readdirSync(dir).filter(f => f.startsWith('input-'))
files.sort(function(a, b) {
    return fs.statSync(dir + a).mtime.getTime() - 
          fs.statSync(dir + b).mtime.getTime();
});
files.forEach(addToQueue);
// console.log(files);

// fs.readdirSync('./resources').forEach(file => {
//   console.log(file);
// });
// addToQueue('input.mp4');
// Example usage: