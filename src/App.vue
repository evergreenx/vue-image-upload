<template>
  <div id="app" class="container mx-auto">
    <div class="body">
      <h1 class="text-danger">Image upload with Firebase</h1>
      <form @submit.prevent>
        <div class="row m-5">
          <div class="col-lg-6">
            <input type="file" class="form-control" @change="showImage" />
            <img :src="preview" />
          </div>
        </div>
        <div class="row m-5">
          <div class="col-lg-6">
            <input type="file" class="form-control" @change="showImage2" />
            <img :src="preview2" />
          </div>
        </div>
        <div class="row m-5">
          <button class="btn btn-large" type="submit" @click="submit">submit</button>
        </div>
      </form>
    </div>
    <div>
      <h3 v-show="loading">Loading...</h3>
    </div>
  </div>
</template>

<style scoped>
.btn {
  background-color: rgb(240, 41, 147) !important;
  color: #fff;
  text-align: center;
  text-transform: capitalize;
}

img {
  width: 100px;
}
</style>
<script>
import firebase from "firebase";
export default {
  data() {
    return {
      loading: false,
      image1: "",
      image2: "",
      preview: "",
      preview2: "",
      imageData: {
        imageLink: "",
        imageLink2: ""
      }
    };
  },

  methods: {
    showImage(pic) {
      var input = pic.target;
      var reader = new FileReader();
      reader.onload = pic => {
        this.preview = pic.target.result;
      };
      reader.readAsDataURL(input.files[0]);
      this.image1 = pic.target.files[0];
      this.preview = null;
    },
    showImage2(pic) {
      var input = pic.target;
      var reader = new FileReader();
      reader.onload = pic => {
        this.preview2 = pic.target.result;
      };
      reader.readAsDataURL(input.files[0]);
      this.image2 = pic.target.files[0];
      this.preview2 = null;
    },
    test() {
      var db = firebase.database().ref();
      db.child("image uploaded")
        .push()
        .set(this.imageData);
      this.loading = false;
      return;
    },
    upload(image, number) {
      return new Promise((resolve, reject) => {
        var storageRef = firebase
          .storage()
          .ref("images")
          .child(`${image.name}`)
          .put(image);

        storageRef.on(
          `state_changed`,
          snapshot => {
            this.uploadValue =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          },
          error => {
            reject(error.message);
          },
          () => {
            this.uploadValue = 100;
            storageRef.snapshot.ref.getDownloadURL().then(url => {
              switch (number) {
                case 1:
                  this.imageData.imageLink = url;
                  break;
                case 2:
                  this.imageData.imageLink2 = url;
                  break;
                default:
                  break;
              }
              resolve (`Uploaded ${number}`)
            });
          }
        );
      });
    },
    onUpload() {
      this.loading = true;
      this.upload(this.image1, 1).then(()=>{
        this.upload(this.image2, 2).then(()=>{
          this.test()
        })
      })
      
    },

    submit() {
      this.onUpload();
    }
  }
};
</script>
