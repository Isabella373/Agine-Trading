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
# Create your views here.
def fetchData(request):
    sp500 = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')[0]
    sp500['Symbol'] = sp500['Symbol'].str.replace('.', '-')


    #get the list of sp500 company names
    sp500_list = sp500['Symbol'].unique().tolist()
    sp500_list.sort()

    #get all the timestamp for the last 180 days
    today = datetime.date.today()
    dayArray = []
    for i in range(1,10):
        dayArray.append( (today + datetime.timedelta(days=-i)).strftime("%Y-%m-%d") )

    #assembly the index for the pandas dataframe
    targetIndexArray = []
    for company in sp500_list:
        temp =[]
        for dayStamp in dayArray:
            temp.append((dayStamp,company))
        targetIndexArray.append(temp)


    #get all the data from yahooFinance
    end_date = today
    start_date = pd.to_datetime(end_date)-pd.DateOffset(10*1)
    df = yf.download(tickers=sp500_list,
                    start=start_date,
                    end=end_date).stack()
    # df.index.names = ['date', 'ticker']
    df.columns = df.columns.str.lower()


    # get the corresponding data from index and put all the data into array for one company
    yahooFinance_json_obj = {}
    for oneCompanyIndexes in targetIndexArray:
        temp =[]
        for targetIndex in oneCompanyIndexes:
            # print(df.index.values)
            if(targetIndex in df.index):
                data = json.loads(df.loc[targetIndex].to_json( orient='index'))
                data["time"] = targetIndex[0]
                temp.append(data)
            # print(temp)
        yahooFinance_json_obj[oneCompanyIndexes[0][1]] = temp
    # print(yahooFinance_json_obj)
    return HttpResponse(json.dumps(yahooFinance_json_obj), content_type="application/json")