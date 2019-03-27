#### Setup
Take clone by running `git clone https://github.com/sunilwananje/Deskera.git` to your htdocs or www or document root folder.

##### Restapi Laravel Installation
- Open restapi folder in command promot and run `composer update` command.
- Create database in mysql server and add database_name, username and password to .env file
- Run `php artisan db:seed` command to create migration and insert test data for features and testimonials.
- Now you are done with api section.

##### Angular Installation
- Make sure your node, npm and angular cli should be in latest version
- Open deskera folder in command promot and run `npm install` command.
- Open `env.ts` file from `\src\app\config\env.ts` update localApi variable to your restpi path eg.
       http://localhost/deskera/restapi/public,
- Now run `ng serve -o`
