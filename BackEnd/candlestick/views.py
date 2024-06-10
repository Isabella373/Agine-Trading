from django.shortcuts import render, HttpResponse
from django.shortcuts import render
import pandas_datareader.data as web
import matplotlib.pyplot as plt
# import statsmodels.api as sm
import pandas as pd
import numpy as np
import datetime as dt
import yfinance as yf
import pandas_ta
import warnings
import json
import datetime
import pytz
warnings.filterwarnings('ignore')


# the following code is used to fetch data from the Candlestick data from yahoo
# #get all the data from yahooFinance
# end_date = today
# start_date = pd.to_datetime(end_date)-pd.DateOffset(10*1)
# df = yf.download(tickers=sp500_list,
#                 start=start_date,
#                 end=end_date).stack()
# # df.index.names = ['date', 'ticker']
# df.columns = df.columns.str.lower()


# Create your views here.
def getAllCandlestickData(request):
    sp500 = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')[0]
    sp500['Symbol'] = sp500['Symbol'].str.replace('.', '-')

    #get the list of sp500 company names
    sp500_list = sp500['Symbol'].unique().tolist()
    sp500_list.sort()

    #get all the timestamp for the last 180 days
    today = datetime.date.today()
    dayArray = []
    for i in range(1,180):
        dayArray.append( (today + datetime.timedelta(days=-i)).strftime("%Y-%m-%d") )

    #assembly the index for the pandas dataframe
    targetIndexArray = []
    for company in sp500_list:
        temp =[]
        for dayStamp in dayArray:
            temp.append((dayStamp,company))
        targetIndexArray.append(temp)

    #get the candlestick data from csv file
    df = pd.read_csv("candlestick/sp500_180.csv")
    df.set_index(["Date","Ticker"], inplace=True)

    # get the corresponding data from index and put all the data into array for one company
    yahooFinance_json_obj = {}
    for oneCompanyIndexes in targetIndexArray:
        temp =[]
        for targetIndex in oneCompanyIndexes:
            if(targetIndex in df.index):
                data = json.loads(df.loc[targetIndex].to_json( orient='index'))
                data["time"] = targetIndex[0]
                temp.append(data)
            # print(temp)
        yahooFinance_json_obj[oneCompanyIndexes[0][1]] = temp

    # print(yahooFinance_json_obj)
    return HttpResponse(json.dumps(yahooFinance_json_obj), content_type="application/json")


def getTargetCandlestickData(request):
    # print( request.body.decode())
    # we only process the data for company in targetlist which saves the time
    targetList =json.loads(request.body.decode())
    #get the list of sp500 company names
    sp500_list =["A", "AAL", "AAPL", "ABBV", "ABNB", "ABT", "ACGL", "ACN", "ADBE", "ADI", "ADM", "ADP", "ADSK", "AEE", "AEP", "AES", "AFL", "AIG", "AIZ", "AJG", "AKAM", "ALB", "ALGN", "ALL", "ALLE", "AMAT", "AMCR", "AMD", "AME", "AMGN", "AMP", "AMT", "AMZN", "ANET", "ANSS", "AON", "AOS", "APA", "APD", "APH", "APTV", "ARE", "ATO", "AVB", "AVGO", "AVY", "AWK", "AXON", "AXP", "AZO", "BA", "BAC", "BALL", "BAX", "BBWI", "BBY", "BDX", "BEN", "BF-B", "BG", "BIIB", "BIO", "BK", "BKNG", "BKR", "BLDR", "BLK", "BMY", "BR", "BRK-B", "BRO", "BSX", "BWA", "BX", "BXP", "C", "CAG", "CAH", "CARR", "CAT", "CB", "CBOE", "CBRE", "CCI", "CCL", "CDNS", "CDW", "CE", "CEG", "CF", "CFG", "CHD", "CHRW", "CHTR", "CI", "CINF", "CL", "CLX", "CMA", "CMCSA", "CME", "CMG", "CMI", "CMS", "CNC", "CNP", "COF", "COO", "COP", "COR", "COST", "CPAY", "CPB", "CPRT", "CPT", "CRL", "CRM", "CSCO", "CSGP", "CSX", "CTAS", "CTLT", "CTRA", "CTSH", "CTVA", "CVS", "CVX", "CZR", "D", "DAL", "DAY", "DD", "DE", "DECK", "DFS", "DG", "DGX", "DHI", "DHR", "DIS", "DLR", "DLTR", "DOC", "DOV", "DOW", "DPZ", "DRI", "DTE", "DUK", "DVA", "DVN", "DXCM", "EA", "EBAY", "ECL", "ED", "EFX", "EG", "EIX", "EL", "ELV", "EMN", "EMR", "ENPH", "EOG", "EPAM", "EQIX", "EQR", "EQT", "ES", "ESS", "ETN", "ETR", "ETSY", "EVRG", "EW", "EXC", "EXPD", "EXPE", "EXR", "F", "FANG", "FAST", "FCX", "FDS", "FDX", "FE", "FFIV", "FI", "FICO", "FIS", "FITB", "FMC", "FOX", "FOXA", "FRT", "FSLR", "FTNT", "FTV", "GD", "GE", "GEHC", "GEN", "GEV", "GILD", "GIS", "GL", "GLW", "GM", "GNRC", "GOOG", "GOOGL", "GPC", "GPN", "GRMN", "GS", "GWW", "HAL", "HAS", "HBAN", "HCA", "HD", "HES", "HIG", "HII", "HLT", "HOLX", "HON", "HPE", "HPQ", "HRL", "HSIC", "HST", "HSY", "HUBB", "HUM", "HWM", "IBM", "ICE", "IDXX", "IEX", "IFF", "ILMN", "INCY", "INTC", "INTU", "INVH", "IP", "IPG", "IQV", "IR", "IRM", "ISRG", "IT", "ITW", "IVZ", "J", "JBHT", "JBL", "JCI", "JKHY", "JNJ", "JNPR", "JPM", "K", "KDP", "KEY", "KEYS", "KHC", "KIM", "KLAC", "KMB", "KMI", "KMX", "KO", "KR", "KVUE", "L", "LDOS", "LEN", "LH", "LHX", "LIN", "LKQ", "LLY", "LMT", "LNT", "LOW", "LRCX", "LULU", "LUV", "LVS", "LW", "LYB", "LYV", "MA", "MAA", "MAR", "MAS", "MCD", "MCHP", "MCK", "MCO", "MDLZ", "MDT", "MET", "META", "MGM", "MHK", "MKC", "MKTX", "MLM", "MMC", "MMM", "MNST", "MO", "MOH", "MOS", "MPC", "MPWR", "MRK", "MRNA", "MRO", "MS", "MSCI", "MSFT", "MSI", "MTB", "MTCH", "MTD", "MU", "NCLH", "NDAQ", "NDSN", "NEE", "NEM", "NFLX", "NI", "NKE", "NOC", "NOW", "NRG", "NSC", "NTAP", "NTRS", "NUE", "NVDA", "NVR", "NWS", "NWSA", "NXPI", "O", "ODFL", "OKE", "OMC", "ON", "ORCL", "ORLY", "OTIS", "OXY", "PANW", "PARA", "PAYC", "PAYX", "PCAR", "PCG", "PEG", "PEP", "PFE", "PFG", "PG", "PGR", "PH", "PHM", "PKG", "PLD", "PM", "PNC", "PNR", "PNW", "PODD", "POOL", "PPG", "PPL", "PRU", "PSA", "PSX", "PTC", "PWR", "PYPL", "QCOM", "QRVO", "RCL", "REG", "REGN", "RF", "RHI", "RJF", "RL", "RMD", "ROK", "ROL", "ROP", "ROST", "RSG", "RTX", "RVTY", "SBAC", "SBUX", "SCHW", "SHW", "SJM", "SLB", "SMCI", "SNA", "SNPS", "SO", "SOLV", "SPG", "SPGI", "SRE", "STE", "STLD", "STT", "STX", "STZ", "SWK", "SWKS", "SYF", "SYK", "SYY", "T", "TAP", "TDG", "TDY", "TECH", "TEL", "TER", "TFC", "TFX", "TGT", "TJX", "TMO", "TMUS", "TPR", "TRGP", "TRMB", "TROW", "TRV", "TSCO", "TSLA", "TSN", "TT", "TTWO", "TXN", "TXT", "TYL", "UAL", "UBER", "UDR", "UHS", "ULTA", "UNH", "UNP", "UPS", "URI", "USB", "V", "VICI", "VLO", "VLTO", "VMC", "VRSK", "VRSN", "VRTX", "VST", "VTR", "VTRS", "VZ", "WAB", "WAT", "WBA", "WBD", "WDC", "WEC", "WELL", "WFC", "WM", "WMB", "WMT", "WRB", "WRK", "WST", "WTW", "WY", "WYNN", "XEL", "XOM", "XYL", "YUM", "ZBH", "ZBRA", "ZTS"]

    #get all the timestamp for the last 180 days
    today = datetime.date.today()
    dayArray = []
    for i in range(1,180):
        dayArray.append( (today + datetime.timedelta(days=-i)).strftime("%Y-%m-%d") )

    #assembly the index for the pandas dataframe
    targetIndexArray = []
    for company in targetList:
        temp =[]
        for dayStamp in dayArray:
            temp.append((dayStamp,company))
        targetIndexArray.append(temp)

    #get the candlestick data from csv file
    df = pd.read_csv("candlestick/sp500_180.csv")
    df.set_index(["Date","Ticker"], inplace=True)

    # get the corresponding data from index and put all the data into array for one company
    yahooFinance_json_obj = {}
    for oneCompanyIndexes in targetIndexArray:
        temp =[]
        for targetIndex in oneCompanyIndexes:
            if(targetIndex in df.index):
                data = json.loads(df.loc[targetIndex].to_json( orient='index'))
                data["time"] = targetIndex[0]
                temp.append(data)
        yahooFinance_json_obj[oneCompanyIndexes[0][1]] = temp


    result = {}
    for item in targetList:
        result[item] = yahooFinance_json_obj[item]
    
    return HttpResponse(json.dumps(result), content_type="application/json")