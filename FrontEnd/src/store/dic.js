"use client";
import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const loadCandleSticks = createAsyncThunk("post/getCandleStickData", async (symbols, { dispatch, getState, extra }) => {
  try {
      let response  = await axios.post(
        "http://127.0.0.1:8000/candlestickDataTarget/",
        symbols,
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response)
      symbols.forEach(element => {
        response.data[element].sort((a, b) => a.time - b.time).reverse();
      });
      // console.log(response.data)
      dispatch(updateCandleStickBatch(response.data))
      return response.data;
  } catch (error) {
      console.log(error);
  }
});


export const loadCandleStick = createAsyncThunk("post/getCandleStickData", async (symbols, { dispatch, getState, extra }) => {
  try {
      let response  = await axios.post(
        "http://127.0.0.1:8000/candlestickDataTarget/",
        symbols,
        { headers: { 'Content-Type': 'application/json' } }
      );
      response.data[symbols[0]].sort((a, b) => a.time - b.time).reverse();
      dispatch(updateFlag(symbols[0]))
      // console.log(response.data)
      return response.data;
  } catch (error) {
      console.log(error);
  }
});



// let updateData = {...useSelector((state) => state.dic.candleStick)}
// symbols.forEach((symbol:String)=>{
//   updateData[symbol] = response.data[symbol];

// axios.post(
//   "http://127.0.0.1:8000/candlestickDataTarget/",
//   symbols,
//   { headers: { 'Content-Type': 'application/json' } }
// ).then(function (response) {
//     console.log("注意这里：");  
//     console.log(response);

//     //put all the response data into the redux
//     let updateData = {...useSelector((state) => state.dic.candleStick)}
//     symbols.forEach((symbol:String)=>{
//       updateData[symbol] = response.data[symbol];
//     })
//     dispatch(updateCandleStick(updateData))
//     // const symbol = symbols[0];
//     // const data = response.data[symbol];
//     // const parsedData = data.map(item => ({
//     //   time: item.time,
//     //   open: item.open,
//     //   high: item.high,
//     //   low: item.low,
//     //   close: item.close,
//     //   volume: item.volume,
//     // }));
//     // setChartData(parsedData);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });



export const candleSlice = createSlice({
  // namespace
  name: 'candlestick',
  //initialization value
  initialState: {
    sp500_list: ["A", "AAL", "AAPL", "ABBV", "ABNB", "ABT", "ACGL", "ACN", "ADBE", "ADI", "ADM", "ADP", "ADSK", "AEE", "AEP", "AES", "AFL", "AIG", "AIZ", "AJG", "AKAM", "ALB", "ALGN", "ALL", "ALLE", "AMAT", "AMCR", "AMD", "AME", "AMGN", "AMP", "AMT", "AMZN", "ANET", "ANSS", "AON", "AOS", "APA", "APD", "APH", "APTV", "ARE", "ATO", "AVB", "AVGO", "AVY", "AWK", "AXON", "AXP", "AZO", "BA", "BAC", "BALL", "BAX", "BBWI", "BBY", "BDX", "BEN", "BF-B", "BG", "BIIB", "BIO", "BK", "BKNG", "BKR", "BLDR", "BLK", "BMY", "BR", "BRK-B", "BRO", "BSX", "BWA", "BX", "BXP", "C", "CAG", "CAH", "CARR", "CAT", "CB", "CBOE", "CBRE", "CCI", "CCL", "CDNS", "CDW", "CE", "CEG", "CF", "CFG", "CHD", "CHRW", "CHTR", "CI", "CINF", "CL", "CLX", "CMA", "CMCSA", "CME", "CMG", "CMI", "CMS", "CNC", "CNP", "COF", "COO", "COP", "COR", "COST", "CPAY", "CPB", "CPRT", "CPT", "CRL", "CRM", "CSCO", "CSGP", "CSX", "CTAS", "CTLT", "CTRA", "CTSH", "CTVA", "CVS", "CVX", "CZR", "D", "DAL", "DAY", "DD", "DE", "DECK", "DFS", "DG", "DGX", "DHI", "DHR", "DIS", "DLR", "DLTR", "DOC", "DOV", "DOW", "DPZ", "DRI", "DTE", "DUK", "DVA", "DVN", "DXCM", "EA", "EBAY", "ECL", "ED", "EFX", "EG", "EIX", "EL", "ELV", "EMN", "EMR", "ENPH", "EOG", "EPAM", "EQIX", "EQR", "EQT", "ES", "ESS", "ETN", "ETR", "ETSY", "EVRG", "EW", "EXC", "EXPD", "EXPE", "EXR", "F", "FANG", "FAST", "FCX", "FDS", "FDX", "FE", "FFIV", "FI", "FICO", "FIS", "FITB", "FMC", "FOX", "FOXA", "FRT", "FSLR", "FTNT", "FTV", "GD", "GE", "GEHC", "GEN", "GEV", "GILD", "GIS", "GL", "GLW", "GM", "GNRC", "GOOG", "GOOGL", "GPC", "GPN", "GRMN", "GS", "GWW", "HAL", "HAS", "HBAN", "HCA", "HD", "HES", "HIG", "HII", "HLT", "HOLX", "HON", "HPE", "HPQ", "HRL", "HSIC", "HST", "HSY", "HUBB", "HUM", "HWM", "IBM", "ICE", "IDXX", "IEX", "IFF", "ILMN", "INCY", "INTC", "INTU", "INVH", "IP", "IPG", "IQV", "IR", "IRM", "ISRG", "IT", "ITW", "IVZ", "J", "JBHT", "JBL", "JCI", "JKHY", "JNJ", "JNPR", "JPM", "K", "KDP", "KEY", "KEYS", "KHC", "KIM", "KLAC", "KMB", "KMI", "KMX", "KO", "KR", "KVUE", "L", "LDOS", "LEN", "LH", "LHX", "LIN", "LKQ", "LLY", "LMT", "LNT", "LOW", "LRCX", "LULU", "LUV", "LVS", "LW", "LYB", "LYV", "MA", "MAA", "MAR", "MAS", "MCD", "MCHP", "MCK", "MCO", "MDLZ", "MDT", "MET", "META", "MGM", "MHK", "MKC", "MKTX", "MLM", "MMC", "MMM", "MNST", "MO", "MOH", "MOS", "MPC", "MPWR", "MRK", "MRNA", "MRO", "MS", "MSCI", "MSFT", "MSI", "MTB", "MTCH", "MTD", "MU", "NCLH", "NDAQ", "NDSN", "NEE", "NEM", "NFLX", "NI", "NKE", "NOC", "NOW", "NRG", "NSC", "NTAP", "NTRS", "NUE", "NVDA", "NVR", "NWS", "NWSA", "NXPI", "O", "ODFL", "OKE", "OMC", "ON", "ORCL", "ORLY", "OTIS", "OXY", "PANW", "PARA", "PAYC", "PAYX", "PCAR", "PCG", "PEG", "PEP", "PFE", "PFG", "PG", "PGR", "PH", "PHM", "PKG", "PLD", "PM", "PNC", "PNR", "PNW", "PODD", "POOL", "PPG", "PPL", "PRU", "PSA", "PSX", "PTC", "PWR", "PYPL", "QCOM", "QRVO", "RCL", "REG", "REGN", "RF", "RHI", "RJF", "RL", "RMD", "ROK", "ROL", "ROP", "ROST", "RSG", "RTX", "RVTY", "SBAC", "SBUX", "SCHW", "SHW", "SJM", "SLB", "SMCI", "SNA", "SNPS", "SO", "SOLV", "SPG", "SPGI", "SRE", "STE", "STLD", "STT", "STX", "STZ", "SWK", "SWKS", "SYF", "SYK", "SYY", "T", "TAP", "TDG", "TDY", "TECH", "TEL", "TER", "TFC", "TFX", "TGT", "TJX", "TMO", "TMUS", "TPR", "TRGP", "TRMB", "TROW", "TRV", "TSCO", "TSLA", "TSN", "TT", "TTWO", "TXN", "TXT", "TYL", "UAL", "UBER", "UDR", "UHS", "ULTA", "UNH", "UNP", "UPS", "URI", "USB", "V", "VICI", "VLO", "VLTO", "VMC", "VRSK", "VRSN", "VRTX", "VST", "VTR", "VTRS", "VZ", "WAB", "WAT", "WBA", "WBD", "WDC", "WEC", "WELL", "WFC", "WM", "WMB", "WMT", "WRB", "WRK", "WST", "WTW", "WY", "WYNN", "XEL", "XOM", "XYL", "YUM", "ZBH", "ZBRA", "ZTS"],
    candleStick: {},
    status: "loading",
    flag : "MMM",
  },
  // react-redux has builtin immutable plug-in
  reducers: {
    updateSP500_list: (state, action) => {
    //   console.log('changeSP500_list:', JSON.parse(JSON.stringify(state)), state, action)
      state.sp500_list = action.payload
    },
    updateFlag: (state, action) => {
      //   console.log('changeSP500_list:', JSON.parse(JSON.stringify(state)), state, action)
        state.flag = action.payload
      },
    updateCandleStickBatch:(state, action) => {
      //console.log('changeSP500_list:', JSON.parse(JSON.stringify(state)), state, action)
        state.candleStick = {...state.candleStick, ...action.payload};
      }
  },
  extraReducers: builder => {
    builder.addCase(loadCandleStick.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(loadCandleStick.fulfilled, (state, action) => {
      state.status = "success";
      let updateData = {...state.candleStick, ...action.payload};
      state.candleStick =updateData;
    });
    builder.addCase(loadCandleStick.rejected, (state, action) => {
      state.status = "failed";
    });
  }
})

export const { updateSP500_list, updateFlag, updateCandleStickBatch } = candleSlice.actions

export default candleSlice.reducer