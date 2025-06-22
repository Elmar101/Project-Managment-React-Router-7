### CORS 
(Cross-Origin Resource Sharing) — bir veb səhifəsinin, fərqli domenlər üzərində yerləşən resurslarla qarşılıqlı əlaqə qurmasına imkan verən bir təhlükəsizlik mexanizmidir. CORS Express tətbiqlərində də çox vacibdir, çünki bir çox tətbiq bir neçə domenlə əlaqə qurur, məsələn, frontend və backend arasında.

Gəlin Express-də CORS kitabxanasını geniş şəkildə izah edək.

### CORS nədir?
Əsasən, brauzerlər eyni qayda ilə işləyirlər: Bir veb səhifə yalnız eyni domen, port və protokol ilə əlaqə qurmaq hüququna malikdir. CORS, bu məhdudiyyətləri açan bir mexanizm olaraq, veb səhifələrin başqa domenlərdəki resurslara müraciət etməsinə icazə verir.

Misal:

Frontend tətbiqi http://localhost:3000-da işləyir.

Backend serveri isə http://localhost:5000-da yerləşir.

Frontend serveri backend-ə müraciət etmək istəyir, amma CORS standartları onu bloklayacaqdır. Bunun qarşısını almaq üçün CORS-ı backend-də aktivləşdirmək lazımdır.

### Express-də CORS kitabxanası
Express-də CORS-ı aktivləşdirmək üçün cors adlı kitabxanadan istifadə edirik. Bu kitabxana, CORS üçün lazım olan HTTP başlıqlarını avtomatik olaraq əlavə edir və müəyyən domenlərə icazə verir.

### CORS-u Express-də necə quraşdırırıq və istifadə edirik?
1. Kitabxananı quraşdırmaq
Əvvəlcə cors kitabxanasını layihənizə quraşdırmalısınız:
```
npm install cors
bun add cors
```

2. CORS-u tətbiqə əlavə etmək
CORS-u tətbiqinizdə aktivləşdirmək üçün app.use(cors()) funksiyasını istifadə edirik. Bu, serverin bütün URL-lər üçün CORS-u aktiv edəcəkdir.

Misal:
```
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());  // CORS-u bütün domenlərə açıq etmək

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
```

Yuxarıdakı kodda bütün domenlər-ə qarşılıqlı əlaqə icazəsi verilir. Bu, çox ümumi bir yanaşmadır və təhlükəsizlik baxımından uyğun deyil.

3. CORS-u məhdudlaşdırmaq
Əgər yalnız müəyyən domenlərə icazə vermək istəyirsinizsə, cors kitabxanasının konfiqurasiyasını istifadə edərək, yalnız həmin domenləri qəbul edə bilərsiniz.

Misal:
```
const express = require('express');
const cors = require('cors');

const app = express();

// Yalnız müəyyən domenlərə CORS icazəsi vermək
const corsOptions = {
  origin: 'http://localhost:3000', // Yalnız bu domeni qəbul et
  methods: ['GET', 'POST'], // Yalnız GET və POST metodlarına icazə ver
  allowedHeaders: ['Content-Type', 'Authorization'], // Yalnız bu başlıqları qəbul et
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
```
Burada yalnız http://localhost:3000 domenindən gələn sorğulara icazə verilir. Bu, frontend tətbiqinin backend-ə etibarlı şəkildə müraciət etməsini təmin edir.

4. CORS-u xüsusi routelarda istifadə etmək
Əgər yalnız müəyyən bir route (marşrut) üçün CORS-u aktiv etmək istəyirsinizsə, bunu yalnız həmin route-da istifadə edə bilərsiniz:

```
const express = require('express');
const cors = require('cors');

const app = express();

// Yalnız bu route üçün CORS aktiv edir
app.get('/public-data', cors(), (req, res) => {
  res.json({ message: 'This is public data' });
});

// Digər route-lar üçün CORS yoxdur
app.get('/private-data', (req, res) => {
  res.json({ message: 'This is private data' });
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});
```
Burada yalnız /public-data route-dən gələn sorğulara icazə verilir. /private-data route-dən gələn sorğulara icazə verilmə

### CORS-un daha detallı konfiqurasiyası
cors kitabxanası ilə əlavə olaraq digər xüsusiyyətlər də təyin edə bilərsiniz:

1. origin: DOMENLARIN LISTINI TƏYIN EDİR
2. methods: Hansı HTTP metodlarına icazə verilir (GET, POST, PUT, DELETE və s.)
3. allowedHeaders: Hansı HTTP başlıqlarına icazə verilir.
4. exposedHeaders: Hansı başlıqların müştəriyə açıq olacağı təyin edilir.
5. credentials: Cookies və digər məlumatların göndərilməsinə icazə verir (məsələn, Access-Control-Allow-Credentials başlığını təyin etmək).

Misal:

```
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Total-Count'],
  credentials: true,
};

app.use(cors(corsOptions));
```

### CORS başlıqları
=> CORS prosesində müxtəlif başlıqlar istifadə edilir: 
- Access-Control-Allow-Origin: Bu başlıq, istifadəçi domenini belirler yeni hansı domenlərə sorğu göndərməyə icazə verildiyini təyin edir.
Məsələn, Access-Control-Allow-Origin: * — bu bütün domenlərə icazə verir.
Məsələn, Access-Control-Allow-Origin: http://localhost:3000 — bu http://localhost:3000 domenindən gələn sorğulara icazə verir.

- Access-Control-Allow-Methods: Bu başlıq, istifadəçi istənilən HTTP metodlarını belirler yeni hansı metodlarla sorğu göndərməyə icazə verildiyini təyin edir.
Məsələn, Access-Control-Allow-Methods: GET, POST — bu GET və POST metodlarına icazə verir. 

- Access-Control-Allow-Headers: Bu başlıq, istifadəçi istənilən HTTP başlıqlarını belirler yeni hansı başlıqlarla sorğu göndərməyə icazə verildiyini təyin edir.
Məsələn, Access-Control-Allow-Headers: Content-Type, Authorization — bu Content-Type və Authorization başlıqlarına icazə verir.

- Access-Control-Allow-Credentials: Bu başlıq, istifadəçi istənilən cookies və məlumatları göndərməyə icazə verir yeni səhifənin cookies və ya digər müştəri məlumatları ilə serverə sorğu göndərməsinə icazə verir. Əgər bu aktivdirsə, origin başlığı mütləq * olmamalıdır.

- Access-Control-Expose-Headers: Bu başlıq, müştəriyə açıq olan HTTP başlıqlarını belirler yeni hansı başlıqların göndərilməsinə icazə verir.

- Access-Control-Max-Age: Bu başlıq, istifadəçi istənilən sorğuların serverdən gətirilməsi üçün neçə saniyələrə qəbul edəcəyi təyin edir. Əgər bu aktivdirsə, istifadəçi istənilən sorğuların serverdən gətirilməsi üçün neçə saniyələrə qəbul edəcəyi təyin edir.

### Preflight Request və CORS
Bir çox metod və ya xüsusi başlıq istifadə etdikdə, brauzer əvvəlcə preflight request göndərir. Bu, əsas sorğudan əvvəl serverin hansı metodları və başlıqları dəstəklədiyini soruşur.

Məsələn, PUT metodu ilə bir sorğu göndərmək istəyirsinizsə, brauzer ilk öncə OPTIONS sorğusunu göndərəcək ki, bu metodun server tərəfindən qəbul edilib-edilmədiyini öyrənsin.

Misal:
```
OPTIONS /resource HTTP/1.1
Host: backend.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type
Origin: http://frontend.com
```

=> http://developer.mozilla.org

- protokol http
- domein developer.mozilla.org

