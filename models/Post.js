import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  // {
  //   title: String,
  //   description: String,
  // },

  // or more details..
  {
    title: {
      type: String,
      // this is the regular form of required.
      // required: [true, "please enter task title"],
      // But this command below means that at least one of the inputs is required...
      required: [
        function () {
          return !this.description && !this.image;
        },
        "please enter task title",
      ],
    },
    description: {
      type: String,
      // required: [true, "please enter task description"],
      required: [
        function () {
          return !this.title && !this.image;
        },
        "please enter task description",
      ],
    },
    image: {
      type: String,
      required: [
        function () {
          return !this.title && !this.description;
        },
        "please enter task description",
      ],
    },
    // publisher: {
    //   type: String,
    //   required: [true, "there is no publisher!"],
    // },
    // email: {
    //   type: String,
    //   required: [true, "there is no email!"],
    // },
    // image: {
    //   type: String,
    // },
    // userImage: {
    //   type: String,
    // },
    user: {
      // make sure if this type (Object) is best practies or Mied from Mongoose i think...
      type: Object,
      required: [true, "there is no user info!"],
    },
    likes: {
      type: Object,
    },
    comments: {
      type: Object,
    },
    isEdited: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;
