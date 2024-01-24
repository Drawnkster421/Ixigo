import dayjs from "dayjs";
import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

const projectID = "hb4b95z8t9k9";
const appType = "bookingportals";
const SearchContext = createContext();
export const useSearchContext = () => {
	return useContext(SearchContext);
};
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default function SearchProvider({ children }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [fromCity, setFromCity] = useState(0);
	const [toCity, setToCity] = useState(1);
	const [departureDate, setDepartureDate] = useState(new dayjs());
	const [travellers, setTravellers] = useState(0);
	const [data, setData] = useState([]);
	async function searchBookings(setIsLoading) {
		const day = weekDays[new dayjs(searchParams.get("date")).day()];
		const searchVal = JSON.stringify({
			source: searchParams.get("from"),
			destination: searchParams.get("to"),
		});
		let resp;
		try {
			const res = await fetch(
				`https://academics.newtonschool.co/api/v1/bookingportals/flight?search=${searchVal}&day=${day}&limit=1000`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						projectID: projectID,
					},
				}
			);
			resp = await res.json();
			setData(resp.data.flights);
		} catch (error) {
			setData(null);
		} finally {
			setIsLoading(false);
		}
		// console.log(resp.data.flights);
	}
	async function getFlightDetails(flight_id) {
		try {
			const data = await (
				await fetch(
					`https://academics.newtonschool.co/api/v1/bookingportals/fligh/${flight_id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							projectID: projectID,
						},
					}
				)
			).json();
			return data.data;
		} catch (error) {
			return null;
		}
	}
	async function bookFlight(id, depDate, arrDate) {
		const JWT = JSON.parse(localStorage.getItem("authToken"));
		// console.log(JWT);
		// console.log(depDate.toJSON());
		// console.log(arrDate.toJSON());
		const body = {
			bookingType: "flight",
			bookingDetails: {
				flightId: id,
				startdate: depDate.toJSON(),
				endDate: arrDate.toJSON(),
			},
		};
		try {
			const data = await (
				await fetch(
					`https://academics.newtonschool.co/api/v1/bookingportals/booking`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${JWT}`,
							projectID: projectID,
						},
						body: JSON.stringify(body),
					}
				)
			).json();
			return data;
		} catch (error) {
			return { message: "Some Error Occurred!" };
		}
	}
	const provider = {
		fromCity,
		setFromCity,
		toCity,
		setToCity,
		departureDate,
		setDepartureDate,
		travellers,
		setTravellers,
		data,
		setData,
		searchBookings,
		airports,
		passengers,
		getFlightDetails,
		countries,
		tempData,
		bookFlight,
	};
	return (
		<SearchContext.Provider value={{ ...provider }}>
			{children}
		</SearchContext.Provider>
	);
}
const passengers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const airports = [
	{
		name: "Rajiv Gandhi International Airport",
		city: "Hyderabad",
		country: "India",
		iata_code: "HYD",
	},
	{
		name: "Sardar Vallabhbhai Patel International Airport",
		city: "Ahmedabad",
		country: "India",
		iata_code: "AMD",
	},
	{
		name: "Goa International Airport",
		city: "Goa",
		country: "India",
		iata_code: "GOI",
	},
	{
		name: "Pune Airport",
		city: "Pune",
		country: "India",
		iata_code: "PNQ",
	},
	{
		name: "Lokpriya Gopinath Bordoloi International Airport",
		city: "Guwahati",
		country: "India",
		iata_code: "GAU",
	},
	{
		name: "Jaipur International Airport",
		city: "Jaipur",
		country: "India",
		iata_code: "JAI",
	},
	{
		name: "Dr. Babasaheb Ambedkar International Airport",
		city: "Nagpur",
		country: "India",
		iata_code: "NAG",
	},
	{
		name: "Indira Gandhi International Airport",
		city: "Delhi",
		country: "India",
		iata_code: "DEL",
	},
	{
		name: "Chhatrapati Shivaji Maharaj International Airport",
		city: "Mumbai",
		country: "India",
		iata_code: "BOM",
	},
	{
		name: "Kempegowda International Airport",
		city: "Bengaluru",
		country: "India",
		iata_code: "BLR",
	},
	{
		name: "Netaji Subhas Chandra Bose International Airport",
		city: "Kolkata",
		country: "India",
		iata_code: "CCU",
	},
	{
		name: "Chennai International Airport",
		city: "Chennai",
		country: "India",
		iata_code: "MAA",
	},
	{
		name: "Cochin International Airport",
		city: "Kochi",
		country: "India",
		iata_code: "COK",
	},
	{
		name: "Chandigarh International Airport",
		city: "Chandigarh",
		country: "India",
		iata_code: "IXC",
	},
	{
		name: "Biju Patnaik International Airport",
		city: "Bhubaneswar",
		country: "India",
		iata_code: "BBI",
	},
	{
		name: "Coimbatore International Airport",
		city: "Coimbatore",
		country: "India",
		iata_code: "CJB",
	},
	{
		name: "Lucknow International Airport",
		city: "Lucknow",
		country: "India",
		iata_code: "LKO",
	},
	{
		name: "Trivandrum International Airport",
		city: "Thiruvananthapuram",
		country: "India",
		iata_code: "TRV",
	},
	{
		name: "Mangalore International Airport",
		city: "Mangalore",
		country: "India",
		iata_code: "IXE",
	},
	{
		name: "Amritsar International Airport",
		city: "Amritsar",
		country: "India",
		iata_code: "ATQ",
	},
	{
		name: "Dehradun Airport",
		city: "Dehradun",
		country: "India",
		iata_code: "DED",
	},
	{
		name: "Vadodara Airport",
		city: "Vadodara",
		country: "India",
		iata_code: "BDQ",
	},
	{
		name: "Madurai Airport",
		city: "Madurai",
		country: "India",
		iata_code: "IXM",
	},
	{
		name: "Lok Nayak Jayaprakash Airport",
		city: "Patna",
		country: "India",
		iata_code: "PAT",
	},
	{
		name: "Kushok Bakula Rimpochee Airport",
		city: "Leh",
		country: "India",
		iata_code: "IXL",
	},
	{
		name: "Agartala Airport",
		city: "Agartala",
		country: "India",
		iata_code: "IXA",
	},
	{
		name: "Gaya Airport",
		city: "Gaya",
		country: "India",
		iata_code: "GAY",
	},
	{
		name: "Surat Airport",
		city: "Surat",
		country: "India",
		iata_code: "STV",
	},
	{
		name: "Raipur Airport",
		city: "Raipur",
		country: "India",
		iata_code: "RPR",
	},
	{
		name: "Jammu Airport",
		city: "Jammu",
		country: "India",
		iata_code: "IXJ",
	},
];
const countries = [
	"India",
	"United States",
	"China",
	"United Kingdom",
	"Afghanistan",
	"Aland Islands",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua And Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia",
	"Bosnia And Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory",
	"British Virgin Islands",
	"Brunei",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cape Verde",
	"Cayman Islands",
	"Central African Republic",
	"Chad",
	"Chile",
	"Christmas Island",
	"Cocos Islands",
	"Colombia",
	"Comoros",
	"Congo Brazzaville",
	"Congo Kinshasa",
	"Cook Islands",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Cyprus",
	"Czech Republic",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic",
	"East Timor",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Ethiopia",
	"Falkland Islands",
	"Faroe Islands",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories",
	"Gabon",
	"Gambia",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea Bissau",
	"Guyana",
	"Haiti",
	"Heard Island And Mcdonald Islands",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"Indonesia",
	"Iran",
	"Iraq",
	"Ireland",
	"Isle Of Man",
	"Israel",
	"Italy",
	"Ivory Coast",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Kosovo",
	"Kuwait",
	"Kyrgyzstan",
	"Laos",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Macedonia",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia",
	"Moldova",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands",
	"Netherlands Antilles",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"North Korea",
	"Northern Mariana Islands",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestinian Territory",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Reunion",
	"Romania",
	"Russia",
	"Rwanda",
	"Saint Barthélemy",
	"Saint Helena",
	"Saint Kitts And Nevis",
	"Saint Lucia",
	"Saint Martin",
	"Saint Pierre And Miquelon",
	"Saint Vincent And The Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome And Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Serbia And Montenegro",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia And The South Sandwich Islands",
	"South Korea",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan",
	"Suriname",
	"Svalbard And Jan Mayen",
	"Swaziland",
	"Sweden",
	"Switzerland",
	"Syria",
	"Taiwan",
	"Tajikistan",
	"Tanzania",
	"Thailand",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad And Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks And Caicos Islands",
	"Tuvalu",
	"U.s. Virgin Islands",
	"Uganda",
	"Ukraine",
	"United Arab Emirates",
	"United States Minor Outlying Islands",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Vatican",
	"Venezuela",
	"Vietnam",
	"Wallis And Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
];
const tempData = {
	_id: "651d50098c0d859355224f59",
	flightID: "6E001-HYDAMD-235",
	airline: "65144a1b664a43628887c45e",
	aircraftModel: "65144571e16702a399cea7f7",
	source: "HYD",
	destination: "AMD",
	departureTime: "04:50",
	arrivalTime: "05:50",
	duration: 1,
	stops: 2,
	ticketPrice: 2080,
	availableSeats: 85,
	amenities: ["In-flight entertainment", "Complimentary beverage"],
	__v: 1,
};
