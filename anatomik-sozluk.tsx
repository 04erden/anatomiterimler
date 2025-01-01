import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Heart, Search, Clock } from 'lucide-react';

const AnatomikSozluk = () => {
  const [aramaMetni, setAramaMetni] = useState('');
  const [sonuclar, setSonuclar] = useState([]);
  const [seciliTerim, setSeciliTerim] = useState(null);
  const [favoriler, setFavoriler] = useState([]);
  const [sonAramalar, setSonAramalar] = useState([]);

  // Genişletilmiş anatomi sözlüğü
  const sozluk = {
    'abdomen': 'karın',
    'acetabulum': 'kalça eklemi yuvası',
    'acromion': 'omuz çıkıntısı',
    'adenoideus': 'bademcik dokusu',
    'adrenal': 'böbreküstü bezi',
    'alveolus': 'hava kesesi',
    'amnion': 'su kesesi',
    'angulus': 'açı, köşe',
    'aorta': 'ana atardamar',
    'apex': 'tepe noktası',
    'appendix': 'apandis',
    'arcus': 'kemer, yay',
    'arteria': 'atardamar',
    'articulatio': 'eklem',
    'atlas': 'birinci boyun omuru',
    'atrium': 'kulakçık',
    'axilla': 'koltuk altı',
    'bronchus': 'bronş',
    'bucca': 'yanak',
    'bulbus': 'soğan şeklinde şişkinlik',
    'calcaneus': 'topuk kemiği',
    'calvaria': 'kafatası kubbesi',
    'capillaris': 'kılcal damar',
    'caput': 'baş',
    'cardia': 'midenin üst ağzı',
    'cartilago': 'kıkırdak',
    'cavitas': 'boşluk',
    'cerebellum': 'beyincik',
    'cerebrum': 'beyin',
    'cervix': 'boyun',
    'clavicula': 'köprücük kemiği',
    'cor': 'kalp',
    'cornea': 'saydam tabaka',
    'corpus': 'gövde',
    'cortex': 'kabuk',
    'costa': 'kaburga',
    'cranium': 'kafatası',
    'cubitus': 'dirsek',
    'cutis': 'deri',
    'dexter': 'sağ',
    'digitus': 'parmak',
    'dorsum': 'sırt',
    'duodenum': 'oniki parmak bağırsağı',
    'dura mater': 'sert zar',
    'encephalon': 'beyin',
    'endocardium': 'kalp iç zarı',
    'epidermis': 'üst deri',
    'epiglottis': 'gırtlak kapağı',
    'esophagus': 'yemek borusu',
    'extremitas': 'uzuv',
    'facies': 'yüz',
    'falx': 'orak',
    'femur': 'uyluk kemiği',
    'fibula': 'kaval kemiği',
    'foramen': 'delik',
    'fossa': 'çukur',
    'fundus': 'taban',
    'gaster': 'mide',
    'genu': 'diz',
    'gingiva': 'diş eti',
    'glandula': 'bez',
    'glottis': 'ses yarığı',
    'hepar': 'karaciğer',
    'humerus': 'kol kemiği',
    'hyoideum': 'dil kemiği',
    'hypophysis': 'hipofiz bezi',
    'ileum': 'ince bağırsağın son bölümü',
    'index': 'işaret parmağı',
    'iris': 'göz renkli tabakası',
    'jejunum': 'boş bağırsak',
    'labium': 'dudak',
    'labyrinthus': 'iç kulak',
    'lacrima': 'gözyaşı',
    'larynx': 'gırtlak',
    'lens': 'göz merceği',
    'lingua': 'dil',
    'mandibula': 'alt çene',
    'maxilla': 'üst çene',
    'medulla': 'ilik',
    'meninx': 'beyin zarı',
    'musculus': 'kas',
    'myocardium': 'kalp kası',
    'nasus': 'burun',
    'nervus': 'sinir',
    'neuron': 'sinir hücresi',
    'nucleus': 'çekirdek',
    'oculus': 'göz',
    'oesophagus': 'yemek borusu',
    'os': 'kemik',
    'ovarium': 'yumurtalık',
    'palatum': 'damak',
    'pancreas': 'pankreas',
    'patella': 'diz kapağı',
    'pectus': 'göğüs',
    'pelvis': 'leğen kemiği',
    'pericardium': 'kalp zarı',
    'pharynx': 'yutak',
    'pia mater': 'ince zar',
    'pleura': 'akciğer zarı',
    'pollex': 'başparmak',
    'pulmo': 'akciğer',
    'pupilla': 'göz bebeği',
    'radius': 'önkol kemiği',
    'ren': 'böbrek',
    'retina': 'ağ tabaka',
    'sacrum': 'kuyruk sokumu',
    'scapula': 'kürek kemiği',
    'sinus': 'boşluk',
    'spina': 'diken',
    'splen': 'dalak',
    'sternum': 'göğüs kemiği',
    'tarsus': 'ayak bileği',
    'tendo': 'kiriş',
    'thalamus': 'göz yatağı',
    'thorax': 'göğüs kafesi',
    'thymus': 'timus bezi',
    'tibia': 'kaval kemiği',
    'trachea': 'soluk borusu',
    'truncus': 'gövde',
    'tuba': 'boru',
    'ulna': 'dirsek kemiği',
    'umbilicus': 'göbek',
    'uterus': 'rahim',
    'uvula': 'küçük dil',
    'vagina': 'vajina',
    'valvula': 'kapakçık',
    'vena': 'toplardamar',
    'ventriculus': 'karıncık',
    'vertebra': 'omur',
    'vesica': 'mesane',
    'viscera': 'iç organlar',
    'vomer': 'burun bölmesi kemiği'
  };

  // Arama fonksiyonu
  useEffect(() => {
    if (aramaMetni.trim()) {
      const bulunanlar = Object.entries(sozluk)
        .filter(([latince, turkce]) => 
          latince.toLowerCase().includes(aramaMetni.toLowerCase()) ||
          turkce.toLowerCase().includes(aramaMetni.toLowerCase())
        )
        .slice(0, 10);
      setSonuclar(bulunanlar);
    } else {
      setSonuclar([]);
    }
  }, [aramaMetni]);

  const terimSec = (latince, turkce) => {
    const yeniTerim = { latince, turkce };
    setSeciliTerim(yeniTerim);
    setSonuclar([]);
    setAramaMetni('');
    
    // Son aramalara ekleme
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
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <Search className="ml-3 text-gray-500" />
              <Input
                value={aramaMetni}
                onChange={(e) => setAramaMetni(e.target.value)}
                placeholder="Latince veya Türkçe terim ara..."
                className="border-0 focus-visible:ring-0"
              />
            </div>
            
            {sonuclar.length > 0 && (
              <div className="absolute w-full bg-white border rounded-md mt-1 shadow-lg z-10">
                {sonuclar.map(([latince, turkce]) => (
                  <div
                    key={latince}
                    className="p-3 hover:bg-gray-100 cursor-pointer border-b"
                    onClick={() => terimSec(latince, turkce)}
                  >
                    <div className="font-medium">{latince}</div>
                    <div className="text-sm text-gray-600">{turkce}</div>
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
                  <div>
                    <h3 className="text-xl font-bold mb-2">{seciliTerim.latince}</h3>
                    <p className="text-lg">{seciliTerim.turkce}</p>
                  </div>
                  <Heart 
                    className={`cursor-pointer ${favoriler.some(f => f.latince === seciliTerim.latince) ? 'fill-red-500 text-red-500' : ''}`}
                    onClick={() => favoriyeEkle(seciliTerim)}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {sonAramalar.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock size={18} /> Son Aramalar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {sonAramalar.map(terim => (
                    <div 
                      key={terim.latince}
                      className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => setSeciliTerim(terim)}
                    >
                      <p className="font-medium">{terim.latince}</p>
                      <p className="text-sm text-gray-600">{terim.turkce}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div>
          {favoriler.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart size={18} /> Favoriler
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {favoriler.map(terim => (
                    <div 
                      key={terim.latince}
                      className="p-2 hover:bg-gray-50 rounded cursor-pointer"
                      onClick={() => setSeciliTerim(terim)}
                    >
                      <p className="font-medium">{terim.latince}</p>
                      <p className="text-sm text-gray-600">{terim.turkce}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnatomikSozluk;
