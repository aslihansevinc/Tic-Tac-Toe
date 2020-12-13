const X_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/x.png';
const O_IMAGE_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1083533/circle.png';

function yerAta(yer, sahip) {
  const resim = document.createElement('img');
  resim.src = sahip === 'x' ? X_IMAGE_URL : O_IMAGE_URL;
  yer.appendChild(resim);

  const indeks = parseInt(yer.dataset.indeks);
  alinanKutular[indeks] = sahip;
  const indeksKaldir = bosKutular.indexOf(yer);
  bosKutular.splice(indeksKaldir, 1);
  yer.removeEventListener('click', degistirX);
}

function degistirX(olay) {
  yerAta(olay.currentTarget, 'x');

  if (oyunBittiMi()) {
    kazananiGoster();
  } else {
    bilgisayarSecimO();
  }
}

function bilgisayarSecimO() {
  const allBoxes  = document.querySelectorAll('#grid div');
  const indeks = Math.floor(Math.random() * bosKutular.length);
  const bosYer = bosKutular[indeks];

  yerAta(bosYer, 'o');

  if (oyunBittiMi()) {
    kazananiGoster();
  }
}

function oyunBittiMi() {
  return bosKutular.length === 0 || alKazanan() !== null;
}

function kazananiGoster() {
  const kazanan = alKazanan();

  const sonucKonteyner = document.querySelector('#sonuclar');
  const baslik = document.createElement('h1');
  if (kazanan === 'x') {
    baslik.textContent = 'Sen kazandın!';
  } else if (kazanan === 'o'){
    baslik.textContent = 'Bilgisayar kazandı';
  } else {
    baslik.textContent = 'Berabere';
  }
  sonucKonteyner.appendChild(baslik);

  // Kalan olay dinleyicilerini kaldır
  for (const kutu of bosKutular) {
    kutu.removeEventListener('click', degistirX);
  }
}

function kontrolKutular(bir, iki, uc) {
  if (alinanKutular[bir] !== undefined &&
    alinanKutular[bir] === alinanKutular[iki] &&
    alinanKutular[iki] === alinanKutular[uc]) {
    return alinanKutular[bir];
  }
  return null;
}

// 'x', 'o' veya henüz bir kazanan yoksa null değerini döndürür
function alKazanan() {
  for (let sut = 0; sut < 3; sut++) {
    const ofset = sut * 3;
    // Satırları ve sutunları kontrol et
    let sonuc = kontrolKutular(ofset, 1 + ofset, 2 + ofset) ||
        kontrolKutular(sut, 3 + sut, 6 + sut);
    if (sonuc) {
      return sonuc;
    }
  }

   // Köşegenleri kontrol et
  return kontrolKutular(0, 4, 8) || kontrolKutular(2, 4, 6);
}

const bosKutular = [];
// Kutu numarası haritası -> 'x' veya 'o'
const alinanKutular = {};
const kutular = document.querySelectorAll('#grid div');
for (const kutu of kutular) {
  kutu.addEventListener('click', degistirX);
  bosKutular.push(kutu);
}


var article = document.getElementById('elektrikliarac');
console.log(article.dataset.sutun);
console.log(article.dataset.indeksSayi);
console.log(article.dataset.ebeveyn);