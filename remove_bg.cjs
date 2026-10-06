const { Jimp } = require('jimp');

async function removeBlackBg() {
  const input = process.argv[2];
  const output = process.argv[3];
  
  try {
    const image = await Jimp.read(input);
    
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      
      // Threshold for black
      if (red <= 20 && green <= 20 && blue <= 20) {
        this.bitmap.data[idx + 3] = 0; // Set alpha to 0 (transparent)
      }
    });

    await image.write(output);
    console.log("Image processed successfully.");
  } catch (error) {
    console.error("Error processing image:", error);
  }
}

removeBlackBg();
