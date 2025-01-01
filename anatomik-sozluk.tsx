import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Heart, Search, Clock, VolumeUp, BookOpen, Languages } from 'lucide-react';

const AnatomikSozluk = () => {
  const [aramaMetni, setAramaMetni] = useState('');
  const [sonuclar, setSonuclar] = useState([]);
  const [seciliTerim, setSeciliTerim] = useState(null);
  const [favoriler, setFavoriler] = useState([]);
  const [sonAramalar, setSonAramalar] = useState([]);
  const [dil, setDil] = useState('tr'); // tr, en, la

  // Genişletilmiş anatomi sözlüğü
  const sozluk = {
    'abdomen': { tr: 'karın', en: 'abdomen', kategori: 'govde' },
    'acetabulum': { tr: 'kalça eklemi yuvası', en: 'hip socket', kategori: 'kemik' },
    'acromion': { tr: 'omuz çıkıntısı', en: 'shoulder prominence', kategori: 'kemik' },
    'adenohypophysis': { tr: 'ön hipofiz', en: 'anterior pituitary', kategori: 'bez' },
    'adrenal': { tr: 'böbreküstü bezi', en: 'adrenal gland', kategori: 'bez' },
    'alveolus': { tr: 'hava kesesi', en: 'air sac', kategori: 'solunum' },
    'amnion': { tr: 'su kesesi', en: 'amniotic sac', kategori: 'ureme' },
    'anastomosis': { tr: 'damar birleşimi', en: 'vessel connection', kategori: 'damar' },
    'anulus fibrosus': { tr: 'fibröz halka', en: 'fibrous ring', kategori: 'eklem' },
    'aorta': { tr: 'ana atardamar', en: 'main artery', kategori: 'damar' },
    'aponeurosis': { tr: 'yassı kiriş', en: 'flat tendon', kategori: 'kas' },
    'appendix': { tr: 'apandis', en: 'appendix', kategori: 'sindirim' },
    'arachnoidea': { tr: 'örümceksi zar', en: 'arachnoid membrane', kategori: 'sinir' },
    'arteria': { tr: 'atardamar', en: 'artery', kategori: 'damar' },
    'articulatio': { tr: 'eklem', en: 'joint', kategori: 'eklem' },
    'atlas': { tr: 'birinci boyun omuru', en: 'first cervical vertebra', kategori: 'kemik' },
    'atrium': { tr: 'kulakçık', en: 'atrium', kategori: 'kalp' },
    'axilla': { tr: 'koltuk altı', en: 'armpit', kategori: 'govde' },
    'bronchioli': { tr: 'küçük bronşlar', en: 'bronchioles', kategori: 'solunum' },
    'bronchus': { tr: 'bronş', en: 'bronchus', kategori: 'solunum' },
    'bulbus': { tr: 'soğan şeklinde şişkinlik', en: 'bulb-shaped swelling', kategori: 'anatomi' },
    'bursa': { tr: 'eklem kesesi', en: 'joint sac', kategori: 'eklem' },
    'calcaneus': { tr: 'topuk kemiği', en: 'heel bone', kategori: 'kemik' },
    'calvaria': { tr: 'kafatası kubbesi', en: 'skull cap', kategori: 'kemik' },
    'capillaris': { tr: 'kılcal damar', en: 'capillary', kategori: 'damar' },
    'capsula': { tr: 'kapsül', en: 'capsule', kategori: 'anatomi' },
    'caput': { tr: 'baş', en: 'head', kategori: 'govde' },
    'cartilago': { tr: 'kıkırdak', en: 'cartilage', kategori: 'kemik' },
    'cavitas': { tr: 'boşluk', en: 'cavity', kategori: 'anatomi' },
    'cerebellum': { tr: 'beyincik', en: 'cerebellum', kategori: 'sinir' },
    'cerebrum': { tr: 'beyin', en: 'brain', kategori: 'sinir' },
    'cervix': { tr: 'boyun', en: 'neck', kategori: 'govde' },
    'chiasma': { tr: 'çaprazlaşma', en: 'crossing', kategori: 'sinir' },
    'chorda': { tr: 'kiriş', en: 'cord', kategori: 'anatomi' },
    'cisterna': { tr: 'sıvı deposu', en: 'fluid reservoir', kategori: 'anatomi' },
    'clavicula': { tr: 'köprücük kemiği', en: 'collarbone', kategori: 'kemik' },
    'clinoideus': { tr: 'yatak ayağı şeklinde', en: 'bed-post shaped', kategori: 'anatomi' },
    'cochlea': { tr: 'salyangoz', en: 'cochlea', kategori: 'duyu' },
    'collum': { tr: 'boyun', en: 'neck', kategori: 'govde' },
    'colon': { tr: 'kalın bağırsak', en: 'large intestine', kategori: 'sindirim' },
    'columna': { tr: 'sütun', en: 'column', kategori: 'anatomi' },
    'commissura': { tr: 'bağlantı', en: 'connection', kategori: 'anatomi' },
    'concha': { tr: 'burun kemiği', en: 'nasal concha', kategori: 'kemik' },
    'condylus': { tr: 'eklem çıkıntısı', en: 'joint prominence', kategori: 'eklem' },
    'cor': { tr: 'kalp', en: 'heart', kategori: 'kalp' },
    'cornea': { tr: 'saydam tabaka', en: 'cornea', kategori: 'duyu' },
    'corpus': { tr: 'gövde', en: 'body', kategori: 'govde' },
    'cortex': { tr: 'kabuk', en: 'cortex', kategori: 'anatomi' },
    'costa': { tr: 'kaburga', en: 'rib', kategori: 'kemik' },
    'cranium': { tr: 'kafatası', en: 'skull', kategori: 'kemik' },
    'cricoideus': { tr: 'halka kıkırdak', en: 'ring cartilage', kategori: 'solunum' },
    'cubitus': { tr: 'dirsek', en: 'elbow', kategori: 'eklem' },
    'cutis': { tr: 'deri', en: 'skin', kategori: 'deri' },
    'dendritum': { tr: 'sinir uzantısı', en: 'dendrite', kategori: 'sinir' },
    'dens': { tr: 'diş', en: 'tooth', kategori: 'sindirim' },
    'diaphragma': { tr: 'diyafram', en: 'diaphragm', kategori: 'kas' },
    'diaphysis': { tr: 'kemik gövdesi', en: 'bone shaft', kategori: 'kemik' },
    'digitus': { tr: 'parmak', en: 'finger', kategori: 'ekstremite' },
    'discus': { tr: 'disk', en: 'disc', kategori: 'eklem' },
    'dorsum': { tr: 'sırt', en: 'back', kategori: 'govde' },
    'ductus': { tr: 'kanal', en: 'duct', kategori: 'anatomi' },
    'duodenum': { tr: 'oniki parmak bağırsağı', en: 'duodenum', kategori: 'sindirim' },
    'dura mater': { tr: 'sert zar', en: 'dura mater', kategori: 'sinir' },
    // ... (önceki terimler korundu)
  };

  // Sesli okuma fonksiyonu
  const sesliOku = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'tr' ? 'tr-TR' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  // Arama fonksiyonu
  useEffect(() => {
    if (aramaMetni.trim()) {
      const bulunanlar = Object.entries(sozluk)
        .filter(([latince, detay]) => 
          latince.toLowerCase().includes(aramaMetni.toLowerCase()) ||
          detay.tr.toLowerCase().includes(aramaMetni.toLowerCase()) ||
          detay.en.toLowerCase().includes(aramaMetni.toLowerCase())
        )
        .slice(0, 10);
      setSonuclar(bulunanlar);
    } else {
      setSonuclar([]);
    }
  }, [aramaMetni]);

  const terimSec = (latince, detay) => {
    const yeniTerim = { latince, ...detay };
    setSeciliTerim(yeniTerim);
    setSonuclar([]);
    setAramaMetni('');
    
    setSonAramalar(prev => {
      const yeniListe = prev.filter(t => t.latince !== latince);
      return [yeniTerim, ...yeniListe].slice(0, 5);
    });
  };

  const favoriyeEkle = (terim) => {
    setFavoriler(prev => {
      if (prev.some(f => f.latince === terim.latince)) {
        return prev.filter(f => f.latince !== terim.latince);
      }
      return [...prev, terim];
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-center text-3xl">Anatomi Terimleri Sözlüğü</CardTitle>
          <div className="flex justify-center gap-2">
            <Badge 
              variant={dil === 'tr' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setDil('tr')}
            >
              Türkçe
            </Badge>
            <Badge 
              variant={dil === 'en' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setDil('en')}
            >
              English
            </Badge>
            <Badge 
              variant={dil === 'la' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setDil('la')}
            >
              Latince
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Search className="ml-3 text-gray-500" />
              <Input
                value={aramaMetni}
                onChange={(e) => setAramaMetni(e.target.value)}
                placeholder="Terim ara..."
                className="border-0 focus-visible:ring-0"
              />
            </div>
            
            {sonuclar.length > 0 && (
              <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
                {sonuclar.map(([latince, detay]) => (
                  <div
                    key={latince}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                    onClick={() => terimSec(latince, detay)}
                  >
                    <div className="font-medium">{latince}</div>
                    <div className="text-sm text-gray-600">
                      {dil === 'tr' ? detay.tr : detay.en}
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      {detay.kategori}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          {seciliTerim && (
            <Card className="mb-4">
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold">{seciliTerim.latince}</h3>
                      <VolumeUp 
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                        onClick={() => sesliOku(seciliTerim.latince, 'la')}
                        size={20}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Türkçe:</span>
                        {seciliTerim.tr}
                        <VolumeUp 
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                          onClick={() => sesliOku(seciliTerim.tr, 'tr')}
                          size={20}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">İngilizce:</span>
                        {seciliTerim.en}
                        <VolumeUp 
                          className="cursor-pointer text-gray-500 hover:text-gray-700"
                          onClick={() => sesliOku(seciliTerim.en, 'en')}
                          size={20}
                        />
                      </div>