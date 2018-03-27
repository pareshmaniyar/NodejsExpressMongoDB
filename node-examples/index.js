var rect=require("./rectangle");
function solveRect(l,b){
	console.log(l+" "+b);
	rect(l,b, (err, rectangle) => {
		if(err){
			console.log("ERROR: "+err.message);
		}else{
			console.log("area: "+ rectangle.area()+ " perimeter: "+ rectangle.perimeter());
		}
	});
	console.log("Asynchronous execution");
}
solveRect(3,4);
solveRect(30,40);
solveRect(3,40);
solveRect(30,4);