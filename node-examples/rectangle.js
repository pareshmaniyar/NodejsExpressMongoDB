module.exports = (x,y,callback) => {
	if(x<=0 || y<=0){
		setTimeout( () => callback(new Error("chindi values nako dalo"), null), 4000);//4 seconds delay
	}else{
		setTimeout(() => callback(null, {
			perimeter: () => (2*(x+y)), //javascript object containing two functions as two values
			area: () => (x*y)
		}, 4000));
	}
}