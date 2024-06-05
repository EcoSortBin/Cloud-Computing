const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node.decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['plastik'];

    const classResult = tf.argMax(prediction, 1).dataSync()[0];
    const label = classes[classResult];

    let deskripsi, jenis, penanganan;

    if (label === 'plastik') {
      deskripsi = "Sampah plastik adalah sampah dengan bahan sintetis yang dapat dibentuk menjadi berbagai bentuk dan digunakan dalam berbagai produk karena sifatnya yang ringan dan tahan lama.";
      jenis = "anorganik";
      penanganan = "Kerajinan Tas Tangan, Plastik bekas dapat dijadikan bahan baku untuk membuat kerajinan tas tangan yang ramah lingkungan dan modis, Kerajinan Patung, Plastik bekas dapat diubah menjadi patung dengan menggunakan teknik pemanasan dan pembentukan, Kerajinan Hiasan Rumah, Plastik bekas dapat digunakan untuk membuat hiasan rumah, Kerajinan Mainan Anak, Plastik bekas dapat dijadikan bahan untuk membuat mainan anak-anak yang aman dan menghibur, Kerajinan Aksesoris, Plastik bekas dapat diubah menjadi aksesoris dengan proses pemotongan dan penggabungan, Plastik Daur Ulang, Plastik dapat didaur ulang menjadi berbagai produk plastik baru atau perabotan rumah tangga, Perabotan Rumah Tangga, Plastik bekas dapat didaur ulang menjadi perabotan rumah tangga, Kemasan Makanan, Plastik dapat didaur ulang menjadi bahan kemasan makanan yang ramah lingkungan dan mudah didaur ulang, Plastik Batangan, Plastik dapat didaur ulang menjadi batangan plastik yang dapat digunakan sebagai bahan baku dalam pembuatan produk plastik lainnya, Alat Rumah Tangga, Plastik bekas dapat diubah menjadi alat rumah tangga dengan proses pemotongan dan pembentukan, Pembuangan Akhir, Plastik yang sudah terkontaminasi bahan berbahaya biasanya tidak bisa didaur ulang dan sebaiknya dibuang ke tempat pembuangan akhir (TPA).";
    }

    return { confidenceScore, label, deskripsi, jenis, penanganan };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan input: ${error.message}`);
  }
}

module.exports = predictClassification;
