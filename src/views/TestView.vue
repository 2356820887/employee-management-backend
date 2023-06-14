<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="Upload Image">
        <el-upload
          class="avatar-uploader"
          action="http://127.0.0.1:5000/employee/upload-image"
          :show-file-list="false"
          :headers="{ 'X-CSRFToken': csrfToken }"
          :on-success="handleSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        imageUrl: "",
      },
      csrfToken: "{{ csrf_token() }}",
      imageUrl: "",
    };
  },
  methods: {
    handleSuccess(response) {
      console.log(response);
      this.form.imageUrl = `/get-image/${response.filename}`;
      this.getImageUrl(response.filename);
    },
    getImageUrl(filename) {
      this.axios
        .get(`http://127.0.0.1:5000/employee/get-image/${filename}`)
        .then((response) => {
          this.imageUrl = response.config.url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
