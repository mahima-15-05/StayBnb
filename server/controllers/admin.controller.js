const getData = async (req, res) => {
  res.status(200).json([{ _id:"1",title:"Title1", description:"this is a well furnished room" },{ _id:"2", title:"Title2", description:"this is a well furnished room" },{ _id:"3", title:"Title3", description:"this is a well furnished room" },{_id:"4",  title:"Title4", description:"this is a well furnished room" }]);
};

module.exports = { getData };
