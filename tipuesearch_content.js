var tipuesearch = {"pages":[{"title":"About Me","text":"Hi! My name is Prakhar and welcome to my website. While choosing Software Engineering as my professional career, I am also interested in music (both listening and playing), cinematography, writing and storytelling. I have huge fascination for art, whether it is drawing a cartoon on paper with a ball pen or a ten year long anime, I am all for it. If you are an artist who plays music/likes drawing/do comedy or involve in any creative endeavour, I am already a fan of you and will always root for you! To have light hearted time, I usually watch a podcast/watch some comic videos or sometimes watch a movie or tv series recommended by my friends. Even better if I have some friends with me and couple of beers. As an engineer, I have built applications from scratch which have been catered to PAN India and they are currently helping the law enforcement agencies to maintain law and order in our beloved country. I love writing code in python, whether it be flask/django/pyspark or anything related. I like to imagine myself building AI which will work for the welfare of humankind. While it is mostly daydreaming, There is certain truth to it and if given an opportunity, I am willing to make it happen at all cost. Find my resume here: Prakhar Mishra","tags":"pages","url":"https://prakharmishra.com/pages/About.html","loc":"https://prakharmishra.com/pages/About.html"},{"title":"Contact Me","text":"Thank you for taking time to visit my internet home! If you want to connect further: Send an invite on LinkedIn: LinkedIn Send DM on Instagram: Instagram Drop me a mail at: prakharmishra2593@gmail.com","tags":"pages","url":"https://prakharmishra.com/pages/Contact.html","loc":"https://prakharmishra.com/pages/Contact.html"},{"title":"Encrypt Sensitive Data Using AES before sending to server over Http/s (Javascript, Python)","text":"Often times software developers are found creating user authentication for their website. Most of the times they build the complete end to end systems which includes strong password policies, SHA-1 encryptes passwords which are saved in database in 'User' table, User account lock after multiple unsuccessful login attempts and yada yada, but they miss out on encrypting passwords before sending to server. When we see the websites of big tech companies, there is almost never a case where a user's password is sent as it is to the server for authentication. This is an important security measure which every developer should be aware of. So in this article, we will discuss how we can encrypt user password ono frontend using javascipt and how we will decrypt it in our python backend and use that for user authentication. First of all, we need to download the aes.js file. You can download the file with the link: aes.js Next thing we are going to do is we will add the downloaded file to our project's static folder and then import in our base.html file. I assume that this is already setup in yourr codebase. Now we will stop the login form submission using javascript/jQuery and first encrypt the password! Below is the javascript code we are going to be adding: $ ( '#login-click' ). on ( 'click' , function ( e ){ e . preventDefault (); var passwd = $ ( '#password_field' ). val (); var key = CryptoJS . enc . Utf8 . parse ( '_demo_application' ); var iv = CryptoJS . enc . Utf8 . parse ( '1234567812345678' ); var encryptPass = CryptoJS . AES . encrypt ( passwd , key , { iv : iv , mode : CryptoJS . mode . CBC , padding : CryptoJS . pad . Pkcs7 }); $ ( '#password_field' ). val ( encryptPass ); $ ( \".login-form\" ). submit (); }); Okay, so now we are sending the user password in encrypted form using CryptoJS. Next thing we need to achieve is to accept the username and password in our backend code, and decrypt the password to get the real password and authenticate with oour user table. As we move to the backend python code, Lets make sure these two libraries are imported in your py file: import base64 from Crypto.Cipher import AES To be able to import AES from Crypto.Cipher, we need to first install some libraries: pip3 install pycrypto pip3 install pycryptodome Once we install the above libraries, our imports will start working. Now we are going to do the decyption of encrypted password. The python code is below: @auth . route ( '/login' , methods = [ 'GET' , 'POST' ]) def login (): if request . method == 'POST' : username = request . form . get ( 'username' ) password = request . form . get ( 'password' ) # ... Your code # ... Your code in_key = '_demo_application' in_iv = '1234567812345678' x = AES . new ( in_key . encode ( \"utf-8\" ), AES . MODE_CBC , in_iv . encode ( \"utf-8\" )) cipher_text = base64 . decodebytes (( password ) . encode ( \"utf-8\" )) padded_pass = x . decrypt ( cipher_text ) . decode ( \"utf-8\" ) unpad_pkcs5 = lambda x : x [: - ord ( x [ - 1 ])] password = unpad_pkcs5 ( padded_pass ) # ... Now we have actual decrypted password of the user and we can carry on with authentication # ... login_user(username, password) As we can see in code above, we have derived the decypted password and we can use that for authentication using flask's login methods. We can be very creative with this, we can send the KEY and IV values randomly generated from our backend which we will store in the session and use at the time of decryption. This way KEY and IV will be different for every login attempt. That is all, I hope this was helpful to you and solved your problem. Also note that CBC mode of encryption is vulnerable against LUCKY13 attack (i don't know what it is.. must read it later sometime). so I suggest you to change the mode of cipher if you really want top notch security. Anyway this was enough to solve my problems, Now if you find this less detailed, I encourage you to watch the video that I have created, where I do all the imports and show the running version live. Thank you for taking time to read this article. I will see you in the next one!!! Please find the video demonstration youtube video link: DISCLAIMER: The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also share your further learnings in the comments below as well.","tags":"programming","url":"https://prakharmishra.com/articles/aes-encrypt-user-password-over-http.html","loc":"https://prakharmishra.com/articles/aes-encrypt-user-password-over-http.html"},{"title":"Fixing Host Header Injection in Flask/Nginx setup","text":"Host header injection is a very common vulnerability found in today's websites. An adversary could use this attack to poison the host header and further carry out malicious activities on the victim. In Http request-response model, host header is one of the header found in request made by client. Sometimes web servers use this header information to redirect the request to appropriate application running on some port in the server, sometimes web application use this header to create absolute urls added in thier rounting file (such as urls.py file in Django). The issue is, since the host header is sent by client, we can never trust this data to make server side decisions. Two of the most severe attacks an adversary can do are: Password reset poisoning. Web cache poisoning. Other kind of security breaches can also be done on top of this vulnerablity. For an example, an attacker can get the secret token to reset a user's password by passing malicious header. The web application will then create an absolute URL with malicious header which has the secret token and send the password reset link to the real user's mail. If user happens to click on that reset link which is recieved in his/her mail out of nowhere, User will pass that secret token to an attacker controlled host. To mitigate this, there are two kinds of check which we can apply: Whitelist hosts in our web application. Whitelist hosts in our web server conf. (Our nginx server). Some frameworks such as Django provide configuration variable in settings file while in other framworks we have to check the host header before we process any request. In Django, the setting variable is ALLOWED_HOSTS = [] , where we have to provide host names as a list. But more than often, people put an astrix '*' in that list and carry on this to the production. I advice you to put your IP address or domain name or both in that list and then go for production. This will fix the issue at application level and you will be free of this vulnerability. In Flask, We have a decorator named @app.before_request which allows us to manipulate and validate any requests coming to the server. @app . before_request def check_for_maintenance (): if request . host not in [ '10.x.y.z' , 'www.mywebsite.com' ]: return redirect ( url_for ( '_site/403.html' )) if IS_MAINTENANCE_MODE and request . path != url_for ( \"maintenance\" ): return redirect ( url_for ( 'maintenance' )) This is how we handle and fix the issue using flask/django. Now let's discuss how we can block maliciouos headers using our nginx: Open your nginx.conf file (in my case path is /usr/local/conf/nginx.conf ) Add the below code in your server block: server { listen 443 ssl ; ... ... # Deny bad headers if ( $host !~* &#94; ( www.mywebsite.com ) $ ) { return 444 ; } } Voila, you are good to go. Now nginx is not gonna accept any header other than your mentioned whitelisted one. I hope you found this blog helpful, write in the comments if you have any doubts or if you get stuck somewhere. Thanks for reading this, and I will see you in the next one! DISCLAIMER: The author doesn't intend to be expert on the problems. While these notes will solve your problem at hand, it is always advised to dig deep to the problem if one is interested and also share your further learnings in the comments below as well.","tags":"programming","url":"https://prakharmishra.com/articles/host-header-injection-1.html","loc":"https://prakharmishra.com/articles/host-header-injection-1.html"},{"title":"My First Post","text":"This is the first post . YAY!","tags":"misc","url":"https://prakharmishra.com/articles/My-first-post.html","loc":"https://prakharmishra.com/articles/My-first-post.html"}]};