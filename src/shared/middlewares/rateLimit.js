const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 120000,
  max: 100,
  skip: (req) => {
    const userAgent = req.headers["user-agent"];
    if (
      userAgent.includes("duckduckgo") ||
      userAgent.includes("pingdom") ||
      userAgent.includes("archive.org") ||
      userAgent.includes("ahrefs") ||
      userAgent.includes("semrush") ||
      userAgent.includes("pinterest") ||
      userAgent.includes("uptimerobot") ||
      userAgent.includes("msn") ||
      userAgent.includes("apple") ||
      userAgent.includes("sogou") ||
      userAgent.includes("yandex") ||
      userAgent.includes("baidu") ||
      userAgent.includes("yahoo") ||
      userAgent.includes("googlebot") ||
      userAgent.includes("bingbot") ||
      userAgent.includes("linkedin") ||
      userAgent.includes("mercadolivre") ||
      userAgent.includes("linximpulse") ||
      userAgent.includes("alexabot")
    ) {
      return true;
    }

    if (req.url.match(/\.(jpg|jpeg|png|gif|ico|css|js)$/)) {
      return true;
    }
    return false;
  },
  message:
    "Você atingiu o limite máximo de solicitações. Tente novamente em alguns minutos.",
});

module.exports = limiter;
