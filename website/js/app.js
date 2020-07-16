//api credential
const baseUrl='https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey='appid=2389ef9ef12fe1a7d41e93de8e1b7808'
const countryCode='us'
let temp=document.getElementById('temp');

//posts data to server
const postData = async (url='',data={})=>{
	const res1 = await fetch(url,
		{
			method: 'POST', 
			credentials: 'same-origin', 
			headers: {
			'Content-Type': 'application/json',
				},
			body: JSON.stringify(data), 
		})
		try {
			const newData = await res1.json();
			//console.log(newData);
			return newData
		}catch(error) {
			console.log("error", error);
		// appropriately handle the error
		}
}
//function definition for fetching data from api
const getWeatherData = async (baseUrl , zipCode , apiKey, feel)=>{
	console.log("api called")
		//sets date 
		const d = new Date();
		const dates = d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();

		//fetching data from api  
		const response= await fetch(baseUrl+zipCode+'&'+apiKey+'&units=metric')
		 .then(response=>response.json()).then(resp=>{
			but.classList.remove("loading");
			console.log(resp)
			let	t = resp.main.temp
			let name = resp.name

			//calling to post
			function abc({t,dates,name} , callback)
			{
				let pl = postData('http://127.0.0.1:3000/addData',{temp: t, date: dates, feel: feel, name: name})
				console.log("posts Data")
				callback();
			}
			abc({t,dates,feel,name},UpdateUI);
			console.log("ui updated")	
	})
}

const UpdateUI= async ()=>{
	let getData = await fetch('http://127.0.0.1:3000/getData')
	await getData.json().then(res => {
		document.getElementById('date').innerHTML  = 'Date: '+res.date;
		document.getElementById('nameOfCity').innerHTML = 'City Name: '+res.name;
		document.getElementById('temp').innerHTML = 'Temperature recorded: '+ res.temp;
		document.getElementById('content').innerHTML = 'User Feels: '+res.feel;
	})
}	
			
// call to openweather map api
let but= document.getElementById('generate')
let app = document.getElementById('app') 
but.addEventListener('click', function()
{
	but.classList.add("loading");
	const zipCode=document.getElementById('zip').value;
	const feel=document.getElementById('feelings').value;
	if (zipCode === "" || feel === "" ){
	    window.alert("Please add above details");
	    but.classList.remove("loading");
	}
	else{
		getWeatherData(baseUrl , zipCode , apiKey , feel);
	}
});