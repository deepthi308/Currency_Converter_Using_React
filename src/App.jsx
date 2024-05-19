import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export default function App() {
  const [currency, setCurrency] = useState(100);
  const [convertFrom, setConvertFrom] = useState("INR");
  const [convertTo, setConvertTo] = useState("USD");
  const [result, setResult] = useState("");

  const handleCurrencyChange = (e) => {
    setCurrency((currCurrency) => {
      if (e.target.value.length === 0) {
        return currCurrency;
      } else {
        return e.target.value;
      }
    });
  };

  const handleConvertFromChange = (e) => {
    if (e.target.value === convertTo) {
      toast("Convert From & Convert To Values Should Not Be The Same");
    } else {
      setConvertFrom(e.target.value);
    }
  };

  const handleConvertToChange = (e) => {
    if (e.target.value === convertFrom) {
      toast("Convert From & Convert To Values Should Not Be The Same");
    } else {
      setConvertTo(e.target.value);
    }
  };

  useEffect(() => {
    let API_URL =
      import.meta.env.VITE_REACT_APP_API_URL +
      `?amount=${currency}&from=${convertFrom}&to=${convertTo}`;
    // console.log(API_URL);
    async function getFunction() {
      let res = await fetch(API_URL);
      let data = await res.json();
      // console.log(data);
      setResult(data.rates[convertTo].toFixed(2));
    }

    getFunction();
  }, [currency, convertFrom, convertTo]);

  return (
    <>
      <main className="currency_convertor">
        <header className="header">
          <h1>Currency Convertor</h1>
        </header>
        <section className="container">
          <input
            type="number"
            className="input"
            value={currency}
            min={0}
            onChange={handleCurrencyChange}
          />
          <section className="container_bottom">
            <label htmlFor="">Convert From:</label>
            <select value={convertFrom} onChange={handleConvertFromChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
            <label htmlFor="">Convert To:</label>
            <select value={convertTo} onChange={handleConvertToChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
              <option value="INR">INR</option>
            </select>
          </section>
          <section className="result">
            <h3>{`${result} ${convertTo}`}</h3>
          </section>
        </section>
        <ToastContainer
          position="bottom-right"
          type="error"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
      </main>
      <footer>
        <h4>Copyright &copy; Dhenskript 2024</h4>
      </footer>
    </>
  );
}
