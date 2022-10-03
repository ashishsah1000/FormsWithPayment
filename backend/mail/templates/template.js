const template1 = (
  salute = "Mr/Mrs",
  first = "first name",
  last = "last name",
  subject = "From the form creator",
  body = "body of the mail",
  from = "someone@company.com",
  to = "no@one",
  link = ""
) => `<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>

<body>
  <div class="mail" style="font-family: arial;box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);">
     <div class="nav" style="background: dodgerblue;padding: 20px 20px;font-size: 24px;color: ghostwhite;">
      Welcome to survey 
    </div>
    <div class="content" style="padding: 20px 20px;">
    <h2> <b>${subject}</b></h2>
    
      <h4>From :${from}</h4>
     <h4>To :${to}</h4>
     <span>${salute + " " + last + " " + first}</span>
      <p>${body}</p>
      <p>url to the link <a href=${link}>Click here to respond for the survey</a> </p>
      
    </div>
    <div class="footer" style="background: dodgerblue;padding: 20px 20px;color: ghostwhite;">
      DNB | Company Name 
    </div>
  </div>
 

</body>
</html>`;
const template2 = "this can be a new template";

module.exports = {
  template1: template1,
  template2: template2,
};
