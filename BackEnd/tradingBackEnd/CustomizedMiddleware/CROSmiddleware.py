from django.utils.deprecation import MiddlewareMixin


class CoreMiddle(MiddlewareMixin):
    def process_response(self, request, response):
        # print("中间件已经执行")
        if request.method == 'POST' or request.method == 'OPTIONS':
            response['Access-Control-Allow-Headers'] = 'Content-Type, authorization'  # 如果是 * 就代表全部IP都可以访问
            # response['Access-Control-Allow-Headers'] = request.Header("Origin")  # 如果是 * 就代表全部IP都可以访问
        # print(str(request))
        # response["Access-Control-Allow-Methods”]= "POST,GET, OPTIONS, DELETE, PUT”
        response['Access-Control-Allow-Origin'] = '*'
        return response


