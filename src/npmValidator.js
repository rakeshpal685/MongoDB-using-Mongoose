const mongoose = require('mongoose');
const validator= require("validator");

//Creating connection and connecting to RakeshDB if exist, else Db will be created and connected
mongoose
  .connect('mongodb://localhost:27017/RakeshDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
  })
  .then(() => console.log('Connection successful'))
  .catch((err) => console.log(err));

//Telling that our Schema(table) will have the columns as name,ctype,videos,author,active,date and theire respective type.
const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,//Validating that this is a required field and while creating documment(row) this is required.
    unique:true,
    trim:true,//This will trim the blank space if provided in the beginning and end for name field while creating documment(row).
    minlength:[2,"minimum 2 letters are required"]// Here we are specifing the minimum length for the name field as well as our custom error message.
    //We can specify the custom message in an array where the first value is the validation value and the second is our message.
  },
  ctype: String,
  videos: { // Here we are crating our own validator for video column while creating documment(row).
    type:Number,
  validate(val){ //val will take the value that the user provide for videos field while creating the document(row), 
    if(val<0){
  throw new Error("Video count cannot be less then 0")// We are throwing our own error message after validating.
      }
    }
  },
  author: String,
  email:{
    type:String,
    required:true,
    unique:true,
    validate(val){ // Here we are using the npm validation package to validate the email column, "val" will be the value that the user will input while creating the row
      if(!validator.isEmail(val)){
        throw new Error("Email is not valid"); // custom message
      }
    }
  },
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating Collection(table) with name Playlist which will have the column names as per the schema (playlistSchema) and referenced as Table.
const Table = new mongoose.model('Playlist', playlistSchema);


//INSERTING ONE DOCUMENT(ROW) WITH THE PLAYLIST WHICH WILL HAVE THE COLUMN NAMES AS PER THE SCHEMA (playlistSchema) AND REFERENCED AS Table.
const createDocument = async () => {
  try {
    const reactPlaylist = new Table({ //Creating a new row with reference "reactPlaylist"
      name: 'JAVA Videos',
      ctype: 'Back End',
      videos: 30,
      author: 'Rakesh',
      email:"rex.po@go",// While inserting we will get an error because we have used NPM validation package in the schema to check this field.
      active: true,
    });

    const result = await reactPlaylist.save();//saving the new row
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};
createDocument(); // run the function to add the row 