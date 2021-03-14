Title: Encrypt Sensitive Data Using AES before sending to server over Http/s (Javascript, Python)
Date: 2021-03-14
Tags: encryption, authentication, python, javascript, aes, security
Slug: aes-encrypt-user-password-over-http
Authors: Your name
Summary: How to encrypt sensitive data such as user passwords in javascipt and decrypt using python at backend.


Often times software developers are found creating user authentication for their website. Most of the times they build the complete end to end systems which includes strong password policies, 
SHA-1 encryptes passwords which are saved in database in 'User' table, User account lock after multiple unsuccessful login attempts and yada yada, but they miss out on encrypting passwords before
sending to server. When we see the websites of big tech companies, there is almost never a case where a user's password is sent as it is to the server for authentication. 

This is an important security measure which every developer should be aware of. So in this article, we will discuss how we can encrypt user password ono frontend using javascipt and how we will
decrypt it in our python backend and use that for user authentication.

First of all, we need to download the aes.js file. You can download the file with the link:
[aes.js](https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js)

Next thing we are going to do is we will add the downloaded file to our project's static folder and then import in our `base.html` file. I assume that this is already setup in yourr codebase.

Now we will stop the login form submission using javascript/jQuery and first encrypt the password!
Below is the javascript code we are going to be adding:

``` js
$('#login-click').on('click', function(e){
    e.preventDefault();
    var passwd = $('#password_field').val();
    var key = CryptoJS.enc.Utf8.parse('_demo_application');
    var iv  = CryptoJS.enc.Utf8.parse('1234567812345678');
    var encryptPass = CryptoJS.AES.encrypt(passwd, key, {iv: iv, mode: CryptoJS.mode.CBC, padding:CryptoJS.pad.Pkcs7});
    $('#password_field').val(encryptPass);
    $(".login-form").submit();
});

```

Okay, so now we are sending the user password in encrypted form using CryptoJS. Next thing we need to achieve is to accept the username and password in our backend code, and decrypt the password to
get the real password and authenticate with oour user table.

As we move to the backend python code, Lets make sure these two libraries are imported in your py file:

``` python
import base64
from Crypto.Cipher import AES
```

To be able to import AES from Crypto.Cipher, we need to first install some libraries:

``` bash
pip3 install pycrypto
pip3 install pycryptodome
```

Once we install the above libraries, our imports will start working.
Now we are going to do the decyption of encrypted password. The python code is below:


``` python
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        # ... Your code
        # ... Your code

        in_key = '_demo_application'
        in_iv = '1234567812345678'
        x = AES.new(in_key.encode("utf-8"), AES.MODE_CBC, in_iv.encode("utf-8"))
        cipher_text = base64.decodebytes((password).encode("utf-8"))
        padded_pass = x.decrypt(cipher_text).decode("utf-8")
        unpad_pkcs5 = lambda x: x[:-ord(x[-1])]
        password = unpad_pkcs5(padded_pass)

        # ... Now we have actual decrypted password of the user and we can carry on with authentication
        # ... login_user(username, password)
```

As we can see in code above, we have derived the decypted password and we can use that for authentication using flask's login methods. We can be very creative with this, we can send the KEY and IV
values randomly generated from our backend which we will store in the session and use at the time of decryption. This way KEY and IV will be different for every login attempt.

That is all, I hope this was helpful to you and solved your problem. Also note that CBC mode of encryption is vulnerable against LUCKY13 attack (i don't know what it is.. must read it later sometime).
so I suggest you to change the mode of cipher if you really want top notch security. Anyway this was enough to solve my problems, Now if you find this less detailed, I encourage you to watch the video
that I have created, where I do all the imports and show the running version live.

Thank you for taking time to read this article. I will see you in the next one!!!


___

Please find the video demonstration youtube video link:

[![Please find the video demonstration link if you need more help](https://img.youtube.com/vi/66jPLI_-KNo/0.jpg)](https://youtu.be/66jPLI_-KNo)


** DISCLAIMER: ** The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also
share your further learnings in the comments below as well.


