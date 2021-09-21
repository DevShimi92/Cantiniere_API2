import request from "supertest";
import app from "../../app";
import fs from 'fs';

let tokenAdmin : string ;
let token : string ;

export default function moduleTestImage(): void {

  before(function(done)  {
    this.timeout(60000);
    const loginAdmin = {
        "email":  process.env.COOKER_DEFAUT_EMAIL,
        "password": process.env.COOKER_DEFAUT_PASSWORD,
        };
    
    const login = {
        "email":  'emailE@POemail.com',
        "password": '12345',
        };

    request(app)
      .post('/login')
      .set('Accept', 'application/json')
      .send(loginAdmin)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        tokenAdmin = res.body.token;
      });

      request(app)
          .post('/login')
          .set('Accept', 'application/json')
          .send(login)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            token = res.body.token;
            done();
        });

  });

  it("Get image - Missing Fields", function (done) {
    this.timeout(60000);
    request(app)
        .get('/image')
        .set('Accept', 'application/json')
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });
  
  it("Get image - ID IS NOT A NUMBER", function (done) {
    this.timeout(60000);
    const data = {
      "id_article": '@'
    }
    request(app)
        .get('/image')
        .set('Accept', 'application/json')
        .send(data)
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Get image - Not found", function (done) {
    this.timeout(60000);
    const data = {
      "id_article": 2
    }
    request(app)
        .get('/image')
        .set('Accept', 'application/json')
        .send(data)
        .expect(404)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Post image - Unauthorized", function (done) {
    this.timeout(60000);
    request(app)
        .post('/image')
        .set('Accept', 'application/json')
        .expect(401)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Post image - Forbidden", function (done) {
    this.timeout(60000);
    request(app)
        .post('/image')
        .set('Accept', 'application/json')
        .set('Authorization', 'Bearer ' + token)
        .expect(403)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Post image - Missing Fields", function (done) {
    this.timeout(60000);
    request(app)
        .post('/image')
        .set('content-type', 'multipart/form-data')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Post image - ID IS NOT A NUMBER", function (done) {
    this.timeout(60000);
    const data = {
      "id_article": '@'
    }
    request(app)
        .post('/image')        
        .set('content-type', 'multipart/form-data')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .field('id_article', '@')
        .expect(400)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Post image - Article not found", function (done) {
    this.timeout(60000);
    const data = {
      "id_article": 1
    }
    request(app)
        .post('/image')        
        .set('content-type', 'multipart/form-data')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .field('id_article', 1)
        .expect(404)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Post image - Image not found", function (done) {
    this.timeout(60000);
    request(app)
        .post('/image')
        .set('content-type', 'multipart/form-data')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .field('id_article', 2)
        .expect(404)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Post image - OK", function (done) {
    this.timeout(60000);
    request(app)
        .post('/image')
        .set('content-type', 'multipart/form-data')
        .set('Authorization', 'Bearer ' + tokenAdmin)
        .field('id_article', 2)
        .attach('img','src/resources/test.png')
        .expect(204)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

  it("Get image - Found", function (done) {
    this.timeout(60000);
    const data = {
      "id_article": 2
    }
    request(app)
        .get('/image')
        .set('Accept', 'application/json')
        .send(data)
        .expect(301)
        .end((err) => {
            if (err) return done(err);
            done();
        });
  });

}