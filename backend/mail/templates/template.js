const template1 = `<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
</head>

<body>
  <div class="mail" style="font-family: arial;box-shadow: 1px 1px 5px 0px rgba(0,0,0,0.75);">
     <div class="nav" style="background: tomato;padding: 20px 20px;font-size: 24px;color: ghostwhite;">
      Welcome to survey
    </div>
    <div class="content" style="padding: 20px 20px;">
      <h4>From :Senders Name</h4>
     <h4>From :Recivers Name</h4>
      <p>Content of the email</p>
      <p>url to the link</p>
      
    </div>
    <div class="footer" style="background: tomato;padding: 20px 20px;color: ghostwhite;">
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
