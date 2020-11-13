const mongoose = require('mongoose');

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
  active: Boolean,
  date: {
    type: Date,
    default: Date.now,
  },
});

//Creating Collection(table) with name Playlist which will have the column names as per the schema (playlistSchema) and referenced as Table.
const Table = new mongoose.model('Playlist', playlistSchema);

//
//INSERTING ONE DOCUMENT(ROW) WITH THE PLAYLIST WHICH WILL HAVE THE COLUMN NAMES AS PER THE SCHEMA (playlistSchema) AND REFERENCED AS Table.
// const createDocument = async () => {
//   try {
//     const reactPlaylist = new Table({ //Creating a new row with reference "reactPlaylist"
//       name: 'Node Videos',
//       ctype: 'Back End',
//       videos: 30,
//       author: 'Rakesh',
//       active: true,
//     });

//     const result = await reactPlaylist.save();//saving the new row
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// createDocument(); // run the function to add the row

//
//INSERTING MULTIPLE DOCUMENNTS(ROWS)
// const createDocument = async () => {
//     try {
//       const reactPlaylist = new Table({ //Creating a new row with reference "reactPlaylist"
//         name: 'Node Videos',
//         ctype: 'Back End',
//         videos: 30,
//         author: 'Rakesh',
//         active: true,
//       });

//       const javascriptPlaylist = new Table({ //Creating a new row with reference "reactPlaylist"
//       name: 'JavaScript Videos',
//       ctype: 'Front End',
//       videos: 100,
//       author: 'Rakesh',
//       active: true,
//     });

//     const MongoPlaylist = new Table({ //Creating a new row with reference "reactPlaylist"
//     name: 'Mongo Videos',
//     ctype: 'Database',
//     videos: 30,
//     author: 'Rakesh',
//     active: true,
//   });

//   const mongoosePlaylist = new Table({ //Creating a new row with reference "reactPlaylist"
//   name: 'Mongoose Videos',
//   ctype: 'Database',
//   videos: 10,
//   author: 'Rakesh',
//   active: true,
// });

//       const result = await Table.insertMany([reactPlaylist,mongoosePlaylist,MongoPlaylist,javascriptPlaylist]);//saving the new rows by passing them as arrays
//       console.log(result);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   createDocument(); // run the function to add the row

// //TO GET THE DOCUMNETS/ROWS
// const getDocuments = async () => {
//   try {
//     const result = await Table.find();
//     //const result=await Table.find({ctype:"Front End"}); //to get the result based on some criteria
//     //const result=await Table.find({ctype:"Front End"}).select({name:1}); //to get the name only based on some criteria
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };
// getDocuments();

//TO GET THE DOCUMENTS(ROWS) BASED ON SOME CRITERIA. (COMPARISION/QUERY OPERATOR)
// const getDocuments = async () => {
//   try {
//     //const result=await Table.find({videos:{$gte:50}}).select({name:1}); //to get the rows where number of videos are greater then 50
//    // const result=await Table.find({ctype:{$in:["Back End", "Front End"]}}).select({name:1}); //to get the rows where ctype is either Back End or Front End
//     //const result=await Table.find({ctype:{$nin:["Back End", "Front End"]}}).select({name:1}); //to get the rows where ctype is anything except Back End or Front End
//     //const result=await Table.find({$or:[{ctype:"Back End"},{author:"Rakesh"}]}).select({name:1});// Using OR operator for querying two columns
//     //const result=await Table.find({$or:[{ctype:"Back End"},{author:"Rakesh"}]}).select({name:1}).countDocuments();//TO get the total counts of the output
//     const result=await Table.find({author:"Rakesh"}).select({name:1}).sort({name: -1});//To sort the results based on increasing order of name (1 for increasing order and -1 for descresing order)
//     console.log(result);
//   } catch (err) {
//     console.log(err);
//   }
// };

// getDocuments();


// //UPDATING THE DOCUMENT
// const updateDocument=async(_id)=>{
//   try {
//     const result= await Table.findByIdAndUpdate({_id},{$set:{name: "Updated Javascript Videos"}}, //setting newly updated thing based on the id 
//     {
//       new :true,// By default this is set to false, if false in console it will show the old row that is updated, if true, it will show the updated values
//       useFindAndModify:false //We have to use this because "findByIdAndUpdate" method is deprecated.
//     });
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };


// updateDocument("5fa99e81e929183694e24d6a");//Id of the row which we want to update.

//TO DELETE THE DOCUMENT(ROW)
const deleteDocument= async(_id)=>{
try {
  const result= await Table.deleteOne({_id});// We can use deleteMany to delee multiple rows or findByIdAndDelete() to show the deleted row in the console
  console.log(result);
} catch (error) {
  console.log(error);
}
}

deleteDocument("5fac150cbb7701194cac132a");////Id of the row which we want to delete.