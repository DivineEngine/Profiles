let body = $request.body;

body = body.replace(/&sim_code=\d+/,"&sim_code=51503");
body = body.replace(/&locale=zh_CN/,"&locale=zh_PH");
body = body.replace(/&s_locale=zh-Hans_[A-Z]{2}/,"&s_locale=zh-Hans_PH");

console.log(body)

$done({body});