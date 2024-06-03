from django.shortcuts import render
from django.shortcuts import render, HttpResponse
import json
import hashlib
from accessControl.models import User_detail
import re;
from datetime import date, datetime
from django.forms.models import model_to_dict

class CustomizedJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        else:
            return json.JSONEncoder.default(self, obj)


REGEX_PATTERN = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$"
# check if input is an valid email address
def IsValidEmail(email):
    if (re.search(REGEX_PATTERN, email)):
        print("valid email address")
        return True
    else:
        print("wroing format of email address")
        return False

# used to get the SHA-512 Hash string
def getSHA512_result(user_name, user_password):
    hashObj = hashlib.sha512((user_name+"xx").encode(encoding='utf-8'))
    hashObj.update(user_password.encode(encoding='utf-8'))
    result = hashObj.hexdigest( )
    # print(result)
    return result


#define all the views here:
def user_sign_up(request):
    res = {
        "success": "none",
        "error": "none"
    }

    try:
        data_from_browser = json.loads(request.body)
        # by default, we use email address as the user name
        user_name = data_from_browser['name']
        user_password = data_from_browser['password']

        # check the format of the user_name, it should be a email address as required.
        if(not IsValidEmail(user_name)):
            res['error'] = str("inValid user name")
        else:
            user_name_record_search = User_detail.objects.filter(user_name = user_name).order_by('id').all()
            if user_name_record_search.exists():
                # if the user_name exist in our database, let user know and redirect user to login page
                res['error'] = "user already exist!"
            else:
                # if the user doesn't exist, then we insert the new record
                hash_password = getSHA512_result(user_name, user_password)
                new_record = User_detail(user_name=user_name, user_password=hash_password)
                new_record.save()
                res['success'] = "sign up success"
    except Exception as e:
        res['error'] = str(e)

    return HttpResponse(json.dumps(res, cls=CustomizedJSONEncoder), content_type="application/json")


def user_log_in(request):
    res = {
        "success": "none",
        "error": "none"
    }

    try:
        data_from_browser = json.loads(request.body)
        # by default, we use email address as the user name
        user_name = data_from_browser['name']
        user_password = data_from_browser['password']

        #check if the user name is in our database, if not, send response("user not exist")
        user_name_record_search = User_detail.objects.filter(user_name = user_name).order_by('id').all()
        if user_name_record_search.exists():
            user_name_record = model_to_dict(user_name_record_search[0])
            # check if the hashcode of the password equals to our record
            hash_generate = getSHA512_result(user_name, user_password)
            if hash_generate == user_name_record['user_password']:
                res["success"] = "login success"
        else:
            res["error"] = "login fail" 
    except Exception as e:
        res['error'] = str(e)
    return HttpResponse(json.dumps(res, cls=CustomizedJSONEncoder), content_type="application/json")