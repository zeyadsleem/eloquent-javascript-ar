---
chapter: "21"
slug: project_skill_sharing_website
title: "Project: Skill-Sharing Website"
lang: ar
---
> إن كانت لديك معرفة، فدع الآخرين يشعلون شموعهم منها.
>
> — مارغريت فولر

![رسم توضيحي يُظهر دراجتين أحاديتين مسندتين إلى صندوق بريد](/images/book/chapter_picture_21.jpg)

لقاء *مشاركة المهارات* (skill-sharing) حدث يجتمع فيه أشخاص يشتركون في اهتمام واحد ويقدّمون عروضاً صغيرة غير رسمية عن أشياء يعرفونها. في لقاء لمشاركة المهارات عن البستنة، قد يشرح أحدهم كيفية زراعة الكرفس. أو في مجموعة لمشاركة المهارات في البرمجة، يمكنك أن تمرّ وتحدّث الناس عن Node.js.

في هذا الفصل الأخير من فصول المشاريع، هدفنا إنشاء موقع لإدارة المحادثات المقدَّمة في لقاء لمشاركة المهارات. تخيّل مجموعة صغيرة من الناس تلتقي بانتظام في مكتب أحد الأعضاء للحديث عن ركوب الدراجات الأحادية. انتقل منظّم اللقاءات السابق إلى مدينة أخرى، ولم يتقدّم أحد لتولّي هذه المهمة. نريد نظاماً يتيح للمشاركين اقتراح المحادثات ومناقشتها فيما بينهم دون منظّم فعّال.

كما في [الفصل السابق](/chapter/node_js)، بعض الشيفرة في هذا الفصل مكتوبة لـNode.js، ومن غير المرجّح أن يعمل تشغيلها مباشرة في صفحة HTML التي تنظر إليها. يمكن تنزيل الشيفرة الكاملة للمشروع من [*https://eloquentjavascript.net/code/skillsharing.zip*](https://eloquentjavascript.net/code/skillsharing.zip).

## التصميم

لهذا المشروع جزء *خادم*، مكتوب لـNode.js، وجزء *عميل*، مكتوب للمتصفح. يخزّن الخادم بيانات النظام ويوفّرها للعميل، كما يقدّم الملفات التي تنفّذ نظام جانب العميل.

يحتفظ الخادم بقائمة المحادثات المقترحة للقاء التالي، ويعرض العميل هذه القائمة. ولكل محادثة اسم مقدّم وعنوان وملخص ومصفوفة من التعليقات المرتبطة بها. ويتيح العميل للمستخدمين اقتراح محادثات جديدة (بإضافتها إلى القائمة)، وحذف المحادثات، والتعليق على المحادثات الموجودة. وكلما أجرى المستخدم تغييراً من هذا القبيل، أرسل العميل طلب HTTP لإبلاغ الخادم به.

![لقطة شاشة لموقع مشاركة المهارات](/images/book/skillsharing.png)

سيُعدّ التطبيق لعرض رؤية *حيّة* للمحادثات المقترحة حالياً وتعليقاتها. فكلما قدّم شخص، في أي مكان، محادثة جديدة أو أضاف تعليقاً، ينبغي أن يرى التغيير فوراً كل من فتح الصفحة في متصفحه. وهذا يطرح تحدياً صغيراً — فلا سبيل لخادم ويب إلى فتح اتصال بعميل، ولا طريقة جيدة لمعرفة أي العملاء ينظرون حالياً إلى موقع معيّن.

الحل الشائع لهذه المشكلة يُسمى *الاستقصاء الطويل* (long polling)، وهو يصادف أنه أحد الدوافع وراء تصميم Node.

## الاستقصاء الطويل

كي نتمكن من إخطار عميل فوراً بأن شيئاً قد تغيّر، نحتاج إلى اتصال بذلك العميل. وبما أن متصفحات الويب لا تقبل الاتصالات تقليدياً، وبما أن العملاء غالباً خلف موجّهات تحجب مثل هذه الاتصالات على أي حال، فليس من العملي أن يبدأ الخادم هذا الاتصال.

يمكننا أن نرتب للعميل أن يفتح الاتصال ويبقيه موجوداً حتى يستطيع الخادم استخدامه لإرسال المعلومات عند حاجته إلى ذلك. لكن طلب HTTP لا يسمح إلا بتدفق بسيط للمعلومات: يرسل العميل طلباً، ويعود الخادم باستجابة واحدة، وانتهى الأمر. وهناك تقنية تُسمى *WebSockets* تجعل من الممكن فتح اتصالات لتبادل بيانات عشوائية، لكن استخدام مثل هذه المقابس (sockets) استخداماً سليماً فيه بعض الصعوبة.

في هذا الفصل، نستخدم تقنية أبسط، هي الاستقصاء الطويل، حيث يسأل العملاء الخادم باستمرار عن معلومات جديدة باستخدام طلبات HTTP عادية، ويؤجّل الخادم إجابته حين لا يكون لديه جديد يبلّغ به.

ما دام العميل يحرص على أن يبقى لديه طلب استقصاء مفتوح باستمرار، فسيستقبل المعلومات من الخادم بسرعة بعد أن تصبح متاحة. فمثلاً، إذا كانت فاطمة قد فتحت تطبيق مشاركة المهارات في متصفحها، فسيكون ذلك المتصفح قد أرسل طلباً للتحديثات وسينتظر استجابة لذلك الطلب. وعندما تقدّم إيمان محادثة عن التزحلق الشديد على المنحدرات بالدراجة الأحادية، سيلاحظ الخادم أن فاطمة تنتظر تحديثات، وسيرسل استجابة تحتوي المحادثة الجديدة إلى طلبها المعلّق. وسيستقبل متصفح فاطمة البيانات ويحدّث الشاشة ليعرض المحادثة.

لمنع انتهاء مهلة الاتصالات (إلغائها بسبب انعدام النشاط)، تحدد تقنيات الاستقصاء الطويل عادةً حداً أقصى لزمن كل طلب، وبعده يستجيب الخادم على أي حال، حتى وإن لم يكن لديه ما يبلّغ به. ويمكن للعميل حينئذ بدء طلب جديد. كما أن إعادة تشغيل الطلب دورياً تجعل التقنية أكثر متانة، وتتيح للعملاء التعافي من انقطاعات الاتصال المؤقتة أو مشكلات الخادم.

قد يكون لدى خادم مزدحم يستخدم الاستقصاء الطويل آلاف الطلبات المنتظرة، وبالتالي اتصالات TCP مفتوحة. وتُعدّ Node، التي تجعل إدارة اتصالات كثيرة سهلة دون إنشاء خيط تحكم منفصل لكل اتصال، مناسبة جيداً لنظام كهذا.

## واجهة HTTP

قبل أن نبدأ تصميم الخادم أو العميل، لنفكر في النقطة التي يتلامسان عندها: واجهة HTTP التي يتواصلان عبرها.

سنستخدم JSON صيغةً لجسم طلباتنا واستجاباتنا. وكما في خادم الملفات من [الفصل 20](/chapter/node_js#file_server)، سنحاول الاستفادة الجيدة من طرائق HTTP وترويساتها. تتمحور الواجهة حول المسار `/talks`. أما المسارات التي لا تبدأ بـ`/talks` فستُستخدم لتقديم ملفات ثابتة — شيفرة HTML وJavaScript لنظام جانب العميل.

يعيد طلب `GET` إلى `/talks` مستند JSON مثل هذا:

```json
[{"title": "Unituning",
  "presenter": "Jamal",
  "summary": "Modifying your cycle for extra style",
  "comments": []}]
```

يتم إنشاء محادثة جديدة بإرسال طلب `PUT` إلى URL مثل `/talks/Unituning`، حيث يكون الجزء الذي يلي الشرطة المائلة الثانية هو عنوان المحادثة. وينبغي أن يحتوي جسم طلب `PUT` على كائن JSON له خاصيتا `presenter` و`summary`.

وبما أن عناوين المحادثات قد تحتوي مسافات ومحارف أخرى قد لا تظهر عادةً في URL، فيجب ترميز نصوص العناوين بالدالة `encodeURIComponent` عند بناء URL كهذا.

```js
console.log("/talks/" + encodeURIComponent("How to Idle"));
// → /talks/How%20to%20Idle
```

قد يبدو الطلب الرامي إلى إنشاء محادثة عن الوقوف ساكناً شيئاً كهذا:

```http
PUT /talks/How%20to%20Idle HTTP/1.1
Content-Type: application/json
Content-Length: 92

{"presenter": "Maureen",
 "summary": "Standing still on a unicycle"}
```

تدعم مثل هذه الـURLs أيضاً طلبات `GET` لاسترجاع التمثيل JSON لمحادثة، وطلبات `DELETE` لحذف محادثة.

وتتم إضافة تعليق إلى محادثة بطلب `POST` إلى URL مثل `/talks/Unituning/comments`، مع جسم JSON له خاصيتا `author` و`message`.

```http
POST /talks/Unituning/comments HTTP/1.1
Content-Type: application/json
Content-Length: 72

{"author": "Iman",
 "message": "Will you talk about raising a cycle?"}
```

لدعم الاستقصاء الطويل، قد تتضمن طلبات `GET` إلى `/talks` ترويسات إضافية تخبر الخادم بتأجيل الاستجابة إن لم تتوفر معلومات جديدة. وسنستخدم زوجاً من الترويسات مخصصاً عادةً لإدارة التخزين المؤقت: `ETag` و`If-None-Match`.

قد يضمّن الخادم ترويسة `ETag` («وسم الكيان») في استجابة ما. وقيمتها نص يعرّف النسخة الحالية من المورد. ويمكن للعملاء، عند طلبهم ذلك المورد مجدداً لاحقاً، إرسال *طلب شرطي* بتضمين ترويسة `If-None-Match` تحمل قيمتها النص نفسه. فإن لم يكن المورد قد تغيّر، استجاب الخادم برمز الحالة 304، الذي يعني «لم يُعدّل»، مخبراً العميل بأن نسخته المخزنة مؤقتاً لا تزال حالية. وعندما لا يتطابق الوسم، يستجيب الخادم كالمعتاد.

نحتاج إلى شيء كهذا، حيث يستطيع العميل إخبار الخادم بأي نسخة من قائمة المحادثات لديه، ولا يستجيب الخادم إلا عندما تتغير تلك القائمة. لكن بدلاً من إعادة استجابة 304 فوراً، ينبغي أن يؤجّل الخادم الاستجابة ولا يعود إلا عندما يتوفر شيء جديد أو يمضي قدر معيّن من الوقت. ولتمييز طلبات الاستقصاء الطويل عن الطلبات الشرطية العادية، نمنحها ترويسة أخرى، `Prefer: wait=90`، تخبر الخادم بأن العميل مستعد لانتظار الاستجابة حتى 90 ثانية.

سيحتفظ الخادم برقم نسخة يحدّثه كلما تغيّرت المحادثات، وسيستخدمه قيمةً لـ`ETag`. ويمكن للعملاء إرسال طلبات كهذه ليُخطروا عندما تتغير المحادثات:

```
GET /talks HTTP/1.1
If-None-Match: "4"
Prefer: wait=90

(يمر الوقت)

HTTP/1.1 200 OK
Content-Type: application/json
ETag: "5"
Content-Length: 295

[...]
```

البروتوكول الموصوف هنا لا يفعل أي تحكم في الوصول. فيمكن للجميع التعليق وتعديل المحادثات وحتى حذفها. (وبما أن الإنترنت مليء بالمشاغبين، فمن المحتمل ألا ينتهي وضع نظام كهذا على الإنترنت دون حماية إضافية نهاية حسنة.)

## الخادم

لنبدأ ببناء الجزء الخادمي من البرنامج. الشيفرة في هذا القسم تعمل على Node.js.

### التوجيه

سيستخدم خادمنا الدالة `createServer` في Node لبدء خادم HTTP. وفي الدالة التي تعالج طلباً جديداً، يجب أن نميّز بين مختلف أنواع الطلبات (كما تحدّدها الطريقة والمسار) التي ندعمها. ويمكن فعل ذلك بسلسلة طويلة من جمل `if`، لكن ثمة طريقة أجمل.

*الموجّه* (router) مكوّن يساعد في توجيه الطلب إلى الدالة القادرة على معالجته. يمكنك أن تخبر الموجّه، مثلاً، بأن طلبات `PUT` التي يطابق مسارها التعبير النمطي `/^\/talks\/([^\/]+)$/` (`/talks/` متبوعة بعنوان محادثة) يمكن أن تعالجها دالة معيّنة. وإضافة إلى ذلك، يمكنه المساعدة في استخراج الأجزاء ذات المعنى من المسار (في هذه الحالة عنوان المحادثة)، المحاطة بأقواس في التعبير النمطي، وتمريرها إلى دالة المعالج.

هناك عدد من حزم التوجيه الجيدة على NPM، لكننا سنكتب واحدة بأنفسنا هنا لتوضيح المبدأ.

هذا هو `router.mjs`، الذي سنستورده لاحقاً بـ`import` من وحدة خادمنا:

```js
export class Router {
  constructor() {
    this.routes = [];
  }
  add(method, url, handler) {
    this.routes.push({method, url, handler});
  }
  async resolve(request, context) {
    let {pathname} = new URL(request.url, "http://d");
    for (let {method, url, handler} of this.routes) {
      let match = url.exec(pathname);
      if (!match || request.method != method) continue;
      let parts = match.slice(1).map(decodeURIComponent);
      return handler(context, ...parts, request);
    }
  }
}
```

تُصدّر الوحدة صنف `Router`. ويتيح لك كائن الموجّه تسجيل معالجات لطرائق وأنماط URL محددة بطريقته `add`. وعندما يُحلّ طلب بالطريقة `resolve`، ينادي الموجّه المعالج الذي تتطابق طريقته وURLه مع الطلب ويعيد نتيجته.

تُنادى دوال المعالج بالقيمة `context` المعطاة إلى `resolve`. وسنستخدم هذا لمنحها وصولاً إلى حالة خادمنا. وإضافة إلى ذلك، تستقبل نصوص المطابقة لأي مجموعات عرّفتها في تعبيرها النمطي، وكائن الطلب. ويجب فك ترميز URL للنصوص، لأن الـURL الخام قد يحتوي رموزاً على غرار `%20`.

### تقديم الملفات

عندما لا يطابق طلب أيّاً من أنواع الطلبات المعرّفة في موجّهنا، يجب أن يفسّره الخادم بوصفه طلباً لملف في الدليل `public`. كان يمكن استخدام خادم الملفات المعرّف في [الفصل 20](/chapter/node_js#file_server) لتقديم مثل هذه الملفات، لكننا لا نحتاج إلى دعم طلبات `PUT` و`DELETE` على الملفات ولا نريده، ونرغب في الحصول على ميزات متقدمة مثل دعم التخزين المؤقت. فلنستخدم بدلاً من ذلك خادم ملفات ثابتة متيناً ومُختبَراً جيداً من NPM.

اخترت `serve-static`. وهذا ليس الخادم الوحيد من نوعه على NPM، لكنه يعمل جيداً ويناسب أغراضنا. تُصدّر حزمة `serve-static` دالة يمكن نداؤها بدليل جذر لإنتاج دالة معالج طلبات. وتقبل دالة المعالج المعطيين `request` و`response` اللذين يوفرهما الخادم من `"node:http"`، ومعطى ثالثاً هو دالة ستناديها إن لم يطابق أي ملف الطلب. نريد أن يتحقق خادمنا أولاً من الطلبات التي ينبغي أن نعالجها معالجة خاصة، كما هي معرّفة في الموجّه، لذا نغلّفه في دالة أخرى.

```js
import {createServer} from "node:http";
import serveStatic from "serve-static";

function notFound(request, response) {
  response.writeHead(404, "Not found");
  response.end("<h1>Not found</h1>");
}

class SkillShareServer {
  constructor(talks) {
    this.talks = talks;
    this.version = 0;
    this.waiting = [];

    let fileServer = serveStatic("./public");
    this.server = createServer((request, response) => {
      serveFromRouter(this, request, response, () => {
        fileServer(request, response,
                   () => notFound(request, response));
      });
    });
  }
  start(port) {
    this.server.listen(port);
  }
  stop() {
    this.server.close();
  }
}
```

لدالة `serveFromRouter` الواجهة نفسها التي لـ`fileServer`، إذ تأخذ المعطيات `(request, response, next)`. ويمكننا استخدام هذا «لسَلسَلة» عدة معالجات طلبات، بحيث يعالج كل منها الطلب أو يمرّر مسؤوليته إلى المعالج التالي. أما المعالج الأخير، `notFound`، فيرد ببساطة بخطأ «غير موجود».

وتستخدم دالة `serveFromRouter` لدينا اصطلاحاً مشابهاً لخادم الملفات من [الفصل السابق](/chapter/node_js) في الاستجابات — إذ تعيد المعالجات في الموجّه وعوداً تُحلّ إلى كائنات تصف الاستجابة.

```js
import {Router} from "./router.mjs";

const router = new Router();
const defaultHeaders = {"Content-Type": "text/plain"};

async function serveFromRouter(server, request,
                               response, next) {
  let resolved = await router.resolve(request, server)
    .catch(error => {
      if (error.status != null) return error;
      return {body: String(err), status: 500};
    });
  if (!resolved) return next();
  let {body, status = 200, headers = defaultHeaders} =
    await resolved;
  response.writeHead(status, headers);
  response.end(body);
}
```

### المحادثات كموراد

تُخزَّن المحادثات المقترحة في خاصية `talks` للخادم، وهي كائن أسماء خصائصه عناوين المحادثات. وسنضيف بعض المعالجات إلى موجّهنا تكشف هذه المحادثات كموراد HTTP تحت `/talks/<title>`.

يجب أن يبحث المعالج الخاص بالطلبات التي تجري `GET` لمحادثة واحدة عن المحادثة، ويرد إما ببيانات JSON الخاصة بها أو باستجابة خطأ 404.

```js
const talkPath = /^\/talks\/([^\/]+)$/;

router.add("GET", talkPath, async (server, title) => {
  if (Object.hasOwn(server.talks, title)) {
    return {body: JSON.stringify(server.talks[title]),
            headers: {"Content-Type": "application/json"}};
  } else {
    return {status: 404, body: `No talk '${title}' found`};
  }
});
```

ويتم حذف محادثة بإزالتها من الكائن `talks`.

```js
router.add("DELETE", talkPath, async (server, title) => {
  if (Object.hasOwn(server.talks, title)) {
    delete server.talks[title];
    server.updated();
  }
  return {status: 204};
});
```

وطريقة `updated`، التي سنعرّفها [لاحقاً](/chapter/project_skill_sharing_website#updated)، تُخطر طلبات الاستقصاء الطويل المنتظرة بالتغيير.

أحد المعالجات التي تحتاج إلى قراءة أجسام الطلبات هو معالج `PUT`، المستخدم لإنشاء محادثات جديدة. وعليه أن يتحقق مما إذا كانت البيانات المعطاة له تملك خاصيتي `presenter` و`summary`، وهما نصان. فأي بيانات تأتي من خارج النظام قد تكون هراءً، ولا نريد إفساد نموذج بياناتنا الداخلي أو الانهيار عند وصول طلبات سيئة.

وإذا بدت البيانات صالحة، خزّن المعالج كائناً يمثّل المحادثة الجديدة في الكائن `talks`، ربما مستبدلاً محادثة موجودة بهذا العنوان، ونادى `updated` مرة أخرى.

ولقراءة الجسم من تدفق الطلب، سنستخدم دالة `json` من `"node:stream/consumers"`، التي تجمع البيانات في التدفق ثم تحللها بوصفها JSON. وهناك صادرات مشابهة تُسمى `text` (لقراءة المحتوى نصاً) و`buffer` (لقراءته بيانات ثنائية) في هذه الحزمة. وبما أن `json` اسم عام جداً، تعيد عبارة `import` تسميته `readJSON` لتجنب الالتباس.

```js
import {json as readJSON} from "node:stream/consumers";

router.add("PUT", talkPath,
           async (server, title, request) => {
  let talk = await readJSON(request);
  if (!talk ||
      typeof talk.presenter != "string" ||
      typeof talk.summary != "string") {
    return {status: 400, body: "Bad talk data"};
  }
  server.talks[title] = {
    title,
    presenter: talk.presenter,
    summary: talk.summary,
    comments: []
  };
  server.updated();
  return {status: 204};
});
```

وتتم إضافة تعليق إلى محادثة بطريقة مشابهة. نستخدم `readJSON` للحصول على محتوى الطلب، ونتحقق من صحة البيانات الناتجة، ونخزّنها تعليقاً عندما تبدو صالحة.

```js
router.add("POST", /^\/talks\/([^\/]+)\/comments$/,
           async (server, title, request) => {
  let comment = await readJSON(request);
  if (!comment ||
      typeof comment.author != "string" ||
      typeof comment.message != "string") {
    return {status: 400, body: "Bad comment data"};
  } else if (Object.hasOwn(server.talks, title)) {
    server.talks[title].comments.push(comment);
    server.updated();
    return {status: 204};
  } else {
    return {status: 404, body: `No talk '${title}' found`};
  }
});
```

ومحاولة إضافة تعليق إلى محادثة غير موجودة تعيد خطأ 404.

### دعم الاستقصاء الطويل

أكثر جوانب الخادم إثارة للاهتمام هو الجزء الذي يعالج الاستقصاء الطويل. فعندما يصل طلب `GET` إلى `/talks`، قد يكون طلباً عادياً أو طلب استقصاء طويل.

ستكون هناك مواضع عدة يتعين علينا فيها إرسال مصفوفة محادثات إلى العميل، لذا نعرّف أولاً طريقة مساعدة تبني مثل هذه المصفوفة وتضمّن ترويسة `ETag` في الاستجابة.

```js
SkillShareServer.prototype.talkResponse = function() {
  let talks = Object.keys(this.talks)
    .map(title => this.talks[title]);
  return {
    body: JSON.stringify(talks),
    headers: {"Content-Type": "application/json",
              "ETag": `"${this.version}"`,
              "Cache-Control": "no-store"}
  };
};
```

ويحتاج المعالج نفسه إلى النظر في ترويسات الطلب ليرى ما إذا كانت ترويستا `If-None-Match` و`Prefer` موجودتين. وتخزّن Node الترويسات، التي تُحدَّد أسماؤها لتكون غير حساسة لحالة الأحرف، تحت أسمائها بحروف صغيرة.

```js
router.add("GET", /^\/talks$/, async (server, request) => {
  let tag = /"(.*)"/.exec(request.headers["if-none-match"]);
  let wait = /\bwait=(\d+)/.exec(request.headers["prefer"]);
  if (!tag || tag[1] != server.version) {
    return server.talkResponse();
  } else if (!wait) {
    return {status: 304};
  } else {
    return server.waitForChanges(Number(wait[1]));
  }
});
```

إذا لم يُعطَ أي وسم، أو أُعطي وسم لا يطابق النسخة الحالية للخادم، رد المعالج بقائمة المحادثات. وإذا كان الطلب شرطياً ولم تتغير المحادثات، استشرنا ترويسة `Prefer` لنرى ما إذا كان ينبغي تأجيل الاستجابة أو الرد فوراً.

وتُخزَّن دوال رد النداء الخاصة بالطلبات المؤجّلة في مصفوفة `waiting` الخاصة بالخادم حتى يمكن إخطارها عند حدوث شيء. كما تضبط طريقة `waitForChanges` فوراً مؤقتاً للرد بحالة 304 عندما يكون الطلب قد انتظر مدة كافية.

```js
SkillShareServer.prototype.waitForChanges = function(time) {
  return new Promise(resolve => {
    this.waiting.push(resolve);
    setTimeout(() => {
      if (!this.waiting.includes(resolve)) return;
      this.waiting = this.waiting.filter(r => r != resolve);
      resolve({status: 304});
    }, time * 1000);
  });
};
```

وتسجيل تغيير بـ`updated` يزيد خاصية `version` ويوقظ كل الطلبات المنتظرة.

```js
SkillShareServer.prototype.updated = function() {
  this.version++;
  let response = this.talkResponse();
  this.waiting.forEach(resolve => resolve(response));
  this.waiting = [];
};
```

وبهذا ينتهي كود الخادم. وإذا أنشأنا نسخة من `SkillShareServer` وشغّلناها على المنفذ 8000، قدّم خادم HTTP الناتج الملفات من الدليل الفرعي `public` إلى جانب واجهة لإدارة المحادثات تحت URL الـ`/talks`.

```js
new SkillShareServer({}).start(8000);
```

## العميل

يتكوّن الجزء العميلي من موقع مشاركة المهارات من ثلاثة ملفات: صفحة HTML صغيرة جداً، وورقة أنماط، وملف JavaScript.

### HTML

من الاصطلاحات الشائعة الاستخدام أن تحاول خوادم الويب تقديم ملف اسمه `index.html` عندما يُرسل طلب مباشرة إلى مسار يقابل دليلاً. وخادم الملفات الذي نستخدمه، `serve-static`، يدعم هذا الاصطلاح. فعندما يُرسل طلب إلى المسار `/`، يبحث الخادم عن الملف `./public/index.html` (`./public` هو الجذر الذي أعطيناه له) ويعيد ذلك الملف إن وجده.

لذا، إذا أردنا أن تظهر صفحة عند توجيه متصفح إلى خادمنا، ينبغي أن نضعها في `public/index.html`. وهذا هو ملف الفهرس لدينا:

```html
<!doctype html>
<meta charset="utf-8">
<title>Skill Sharing</title>
<link rel="stylesheet" href="skillsharing.css">

<h1>Skill Sharing</h1>

<script src="skillsharing_client.js"></script>
```

يعرّف عنوان المستند ويضمّن ورقة أنماط تعرّف بضعة أنماط لضمان، من بين أمور أخرى، وجود بعض المسافة بين المحادثات. ثم يضيف عنواناً في أعلى الصفحة ويحمّل السكربت الذي يحتوي تطبيق جانب العميل.

### الإجراءات

تتكوّن حالة التطبيق من قائمة المحادثات واسم المستخدم، وسنخزّنها في كائن `{talks, user}`. ولا نسمح لواجهة المستخدم بالتلاعب بالحالة مباشرةً أو بإرسال طلبات HTTP. بل يجوز لها أن تصدر *إجراءات* (actions) تصف ما يحاول المستخدم فعله.

وتأخذ دالة `handleAction` إجراءً كهذا وتنفّذه. ولأن تحديثات حالتنا بسيطة جداً، تُعالَج تغييرات الحالة في الدالة نفسها.

```js
function handleAction(state, action) {
  if (action.type == "setUser") {
    localStorage.setItem("userName", action.user);
    return {...state, user: action.user};
  } else if (action.type == "setTalks") {
    return {...state, talks: action.talks};
  } else if (action.type == "newTalk") {
    fetchOK(talkURL(action.title), {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        presenter: state.user,
        summary: action.summary
      })
    }).catch(reportError);
  } else if (action.type == "deleteTalk") {
    fetchOK(talkURL(action.talk), {method: "DELETE"})
      .catch(reportError);
  } else if (action.type == "newComment") {
    fetchOK(talkURL(action.talk) + "/comments", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        author: state.user,
        message: action.message
      })
    }).catch(reportError);
  }
  return state;
}
```

سنخزّن اسم المستخدم في `localStorage` حتى يمكن استعادته عند تحميل الصفحة.

أما الإجراءات التي تحتاج إلى إشراك الخادم فترسل طلبات شبكة، باستخدام `fetch`، إلى واجهة HTTP الموصوفة سابقاً. ونستخدم دالة غلاف، `fetchOK`، تضمن رفض الوعد المُعاد عندما يعيد الخادم رمز خطأ.

```js
function fetchOK(url, options) {
  return fetch(url, options).then(response => {
    if (response.status < 400) return response;
    else throw new Error(response.statusText);
  });
}
```

وتُستخدم هذه الدالة المساعدة لبناء URL لمحادثة بعنوان معيّن.

```js
function talkURL(title) {
  return "talks/" + encodeURIComponent(title);
}
```

وعندما يفشل الطلب، لا نريد لصفحتنا أن تظل جالسة بلا فعل دون تفسير. والدالة المسماة `reportError`، التي استخدمناها معالجاً لـ`catch`، تعرض للمستخدم نافذة حوار خشنة تخبره بأن شيئاً ما سار على غير ما يرام.

```js
function reportError(error) {
  alert(String(error));
}
```

### عرض المكوّنات

سنستخدم منهجاً مشابهاً لما رأيناه في [الفصل 19](/chapter/project_a_pixel_art_editor)، بتقسيم التطبيق إلى مكوّنات. لكن بما أن بعض المكوّنات إما لا تحتاج إلى التحديث أبداً وإما تُعاد رسمها بالكامل دائماً عند التحديث، سنعرّف تلك المكوّنات لا كأصناف بل كدوال تعيد مباشرة عقدة DOM. مثلاً، هذا مكوّن يعرض الحقل الذي يمكن للمستخدم إدخال اسمه فيه:

```js
function renderUserField(name, dispatch) {
  return elt("label", {}, "Your name: ", elt("input", {
    type: "text",
    value: name,
    onchange(event) {
      dispatch({type: "setUser", user: event.target.value});
    }
  }));
}
```

ودالة `elt` المستخدمة لبناء عناصر DOM هي نفسها التي استخدمناها في [الفصل 19](/chapter/project_a_pixel_art_editor).

وتُستخدم دالة مشابهة لعرض المحادثات، التي تضم قائمة تعليقات ونموذجاً لإضافة تعليق جديد.

```js
function renderTalk(talk, dispatch) {
  return elt(
    "section", {className: "talk"},
    elt("h2", null, talk.title, " ", elt("button", {
      type: "button",
      onclick() {
        dispatch({type: "deleteTalk", talk: talk.title});
      }
    }, "Delete")),
    elt("div", null, "by ",
        elt("strong", null, talk.presenter)),
    elt("p", null, talk.summary),
    ...talk.comments.map(renderComment),
    elt("form", {
      onsubmit(event) {
        event.preventDefault();
        let form = event.target;
        dispatch({type: "newComment",
                  talk: talk.title,
                  message: form.elements.comment.value});
        form.reset();
      }
    }, elt("input", {type: "text", name: "comment"}), " ",
       elt("button", {type: "submit"}, "Add comment")));
}
```

وينادي معالج حدث `"submit"` الدالة `form.reset` لتفريغ محتوى النموذج بعد إنشاء إجراء `"newComment"`.

وعند إنشاء قطع DOM متوسطة التعقيد، يبدأ هذا الأسلوب من البرمجة يبدو فوضوياً إلى حد ما. ولتجنب ذلك، يستخدم الناس غالباً *لغة قوالب* (templating language)، تتيح لك كتابة واجهتك كملف HTML ببعض العلامات الخاصة للدلالة على مواضع العناصر الديناميكية. أو يستخدمون *JSX*، وهي لهجة JavaScript غير قياسية تتيح لك كتابة شيء قريب جداً من وسوم HTML في برنامجك كما لو كانت تعبيرات JavaScript. وكلا المنهجين يستخدم أدوات إضافية لمعالجة الشيفرة مسبقاً قبل أن يمكن تشغيلها، وهو ما سنجتنبه في هذا الفصل.

وعرض التعليقات بسيط.

```js
function renderComment(comment) {
  return elt("p", {className: "comment"},
             elt("strong", null, comment.author),
             ": ", comment.message);
}
```

وأخيراً، يُعرض النموذج الذي يمكن للمستخدم استخدامه لإنشاء محادثة جديدة هكذا:

```js
function renderTalkForm(dispatch) {
  let title = elt("input", {type: "text"});
  let summary = elt("input", {type: "text"});
  return elt("form", {
    onsubmit(event) {
      event.preventDefault();
      dispatch({type: "newTalk",
                title: title.value,
                summary: summary.value});
      event.target.reset();
    }
  }, elt("h3", null, "Submit a Talk"),
     elt("label", null, "Title: ", title),
     elt("label", null, "Summary: ", summary),
     elt("button", {type: "submit"}, "Submit"));
}
```

### الاستقصاء

لبدء التطبيق، نحتاج إلى قائمة المحادثات الحالية. وبما أن التحميل الأولي مرتبط ارتباطاً وثيقاً بعملية الاستقصاء الطويل — إذ يجب استخدام `ETag` من التحميل عند الاستقصاء — سنكتب دالة تستمر في استقصاء الخادم عن `/talks` وتنادي دالة رد نداء عندما تتوفر مجموعة جديدة من المحادثات.

```js
async function pollTalks(update) {
  let tag = undefined;
  for (;;) {
    let response;
    try {
      response = await fetchOK("/talks", {
        headers: tag && {"If-None-Match": tag,
                         "Prefer": "wait=90"}
      });
    } catch (e) {
      console.log("Request failed: " + e);
      await new Promise(resolve => setTimeout(resolve, 500));
      continue;
    }
    if (response.status == 304) continue;
    tag = response.headers.get("ETag");
    update(await response.json());
  }
}
```

هذه دالة `async` حتى يكون التكرار والانتظار للطلب أسهل. وهي تشغّل حلقة لا نهائية تسترجع في كل تكرار قائمة المحادثات — إما عادةً، وإما، إن لم يكن هذا أول طلب، مع تضمين الترويسات التي تجعله طلب استقصاء طويل.

وعندما يفشل طلب، تنتظر الدالة لحظة ثم تحاول مجدداً. وبهذه الطريقة، إذا انقطع اتصالك بالشبكة مدة ثم عاد، يمكن للتطبيق أن يتعافى ويواصل التحديث. والوعد المحلول عبر `setTimeout` طريقة لإجبار الدالة `async` على الانتظار.

وعندما يعيد الخادم استجابة 304، فهذا يعني أن طلب استقصاء طويل انتهت مهلته، لذا ينبغي للدالة أن تبدأ الطلب التالي فوراً. وإذا كانت الاستجابة استجابة 200 عادية، يُقرأ جسمها بوصفه JSON ويُمرَّر إلى دالة رد النداء، وتُخزَّن قيمة ترويستها `ETag` للتكرار التالي.

### التطبيق

يربط المكوّن التالي واجهة المستخدم كلها معاً:

```js
class SkillShareApp {
  constructor(state, dispatch) {
    this.dispatch = dispatch;
    this.talkDOM = elt("div", {className: "talks"});
    this.dom = elt("div", null,
                   renderUserField(state.user, dispatch),
                   this.talkDOM,
                   renderTalkForm(dispatch));
    this.syncState(state);
  }

  syncState(state) {
    if (state.talks != this.talks) {
      this.talkDOM.textContent = "";
      for (let talk of state.talks) {
        this.talkDOM.appendChild(
          renderTalk(talk, this.dispatch));
      }
      this.talks = state.talks;
    }
  }
}
```

وعندما تتغير المحادثات، يعيد هذا المكوّن رسمها كلها. وهذا بسيط لكنه مضيعة أيضاً. وسنعود إلى ذلك في التمارين.

ويمكننا بدء التطبيق هكذا:

```js
function runApp() {
  let user = localStorage.getItem("userName") || "Anon";
  let state, app;
  function dispatch(action) {
    state = handleAction(state, action);
    app.syncState(state);
  }

  pollTalks(talks => {
    if (!app) {
      state = {user, talks};
      app = new SkillShareApp(state, dispatch);
      document.body.appendChild(app.dom);
    } else {
      dispatch({type: "setTalks", talks});
    }
  }).catch(reportError);
}

runApp();
```

إذا شغّلت الخادم وفتحت نافذتي متصفح لـ[*http://localhost:8000*](http://localhost:8000/) جنباً إلى جنب، يمكنك أن ترى أن الإجراءات التي تنفّذها في نافذة واحدة تظهر فوراً في الأخرى.

## التمارين

ستتضمن التمارين التالية تعديل النظام المعرّف في هذا الفصل. وللعمل عليها، تأكد من أنك نزّلت الشيفرة ([*https://eloquentjavascript.net/code/skillsharing.zip*](https://eloquentjavascript.net/code/skillsharing.zip))، وثبّت Node ([*https://nodejs.org*](https://nodejs.org))، وثبّت اعتمادية المشروع بـ`npm install`.

### الحفظ على القرص

يحتفظ خادم مشاركة المهارات ببياناته في الذاكرة فحسب. وهذا يعني أنه عندما ينهار أو يُعاد تشغيله لأي سبب، تُفقد كل المحادثات والتعليقات.

وسّع الخادم بحيث يخزّن بيانات المحادثات على القرص ويعيد تحميل البيانات تلقائياً عند إعادة تشغيله. لا تقلق بشأن الكفاءة — افعل أبسط شيء يعمل.

<details class="solution">
<summary>إظهار التلميح</summary>

أبسط حل أستطيع ابتكاره هو ترميز الكائن `talks` كله بوصفه JSON وإفراغه في ملف بـ`writeFile`. وهناك بالفعل طريقة (`updated`) تُنادى كلما تغيّرت بيانات الخادم. ويمكن توسيعها لتكتب البيانات الجديدة إلى القرص.

اختر اسم ملف، مثلاً `./talks.json`. وعندما يبدأ الخادم، يمكنه محاولة قراءة ذلك الملف بـ`readFile`، وإن نجح ذلك، يمكن للخادم استخدام محتويات الملف بيانات بداية.

</details>

### إعادة ضبط حقل التعليق

تعمل إعادة الرسم الكاملة للمحادثات جيداً إلى حد بعيد لأنك عادةً لا تستطيع التمييز بين عقدة DOM وبديلتها المطابقة. لكن هناك استثناءات. فإذا بدأت كتابة شيء في حقل التعليق الخاص بمحادثة في نافذة متصفح، ثم أضفت في نافذة أخرى تعليقاً إلى تلك المحادثة، أُعيد رسم الحقل في النافذة الأولى، ما يزيل محتواه وتركيزه معاً.

وعندما يضيف عدة أشخاص تعليقات في الوقت نفسه، سيكون هذا مزعجاً. هل يمكنك ابتكار طريقة لحله؟

<details class="solution">
<summary>إظهار التلميح</summary>

أفضل طريقة لفعل ذلك هي على الأرجح جعل مكوّن المحادثة كائناً له طريقة `syncState`، بحيث يمكن تحديثه ليعرض نسخة معدّلة من المحادثة. وفي التشغيل العادي، الطريقة الوحيدة التي يمكن أن تتغير بها محادثة هي إضافة مزيد من التعليقات، لذا يمكن أن تكون طريقة `syncState` بسيطة نسبياً.

والجزء الصعب هو أنه عندما تصل قائمة محادثات متغيّرة، علينا التوفيق بين قائمة مكوّنات DOM الموجودة والمحادثات في القائمة الجديدة — بحذف المكوّنات التي حُذفت محادثاتها وتحديث المكوّنات التي تغيّرت محادثاتها.

ولفعل ذلك، قد يكون من المفيد الاحتفاظ ببنية بيانات تخزّن مكوّنات المحادثات تحت عناوين المحادثات حتى تستطيع بسهولة معرفة ما إذا كان هناك مكوّن لمحادثة معيّنة. ويمكنك حينئذ التكرار على المصفوفة الجديدة للمحادثات، ولكل منها إما مزامنة مكوّن موجود أو إنشاء مكوّن جديد. ولحذف مكوّنات المحادثات المحذوفة، سيتعين عليك أيضاً التكرار على المكوّنات والتحقق مما إذا كانت المحادثات المقابلة ما زالت موجودة.

</details>
