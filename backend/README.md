1. gernerate json
2. create .env
3. generate express
4. connect to db
5. define schema and create models
-UserTypeSchema
first name
last name
email(unique)
password
role
profileImageUrl
isUserActive usefull only while deleting 
soft delete applying a mask to hide it.it can be restored
-ArticleTypeSchema
author
title
category
content
comments
isArticleActive
6. impliment apis
7. create common api for registration of admin user author
//xss and csrf 
---admin login 
data seek where the credentials given directly to admin
super admin permission 
