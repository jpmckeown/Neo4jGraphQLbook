try {
   decoded = jwt.verify(
     req.headers.authorization.slice(7),
     "Dpwm9XXKqk809WXjCsOmRSZQ5i5fXw8N"
   );
 } catch (e) {
   // token not valid
   console.log(e);
 }
}
return {
 user: decoded,
};

let decoded;
if (req && req.headers && req.headers.authorization) {
