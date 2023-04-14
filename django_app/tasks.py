from celery import shared_task
from django.conf import settings
import smtplib
import os
import environ
from email.mime.text import MIMEText

@shared_task
def add(x, y):
    return x + y



@shared_task
def mysendmailcellery():
    message= 'успешно авторизовались'
    sender = "emailsenderinform@gmail.com"

    

    env = environ.Env()
    environ.Env.read_env()
    password = env('EMAIL_PASSWORD')
    print(password)

    server = smtplib.SMTP("smtp.gmail.com", 587)
    server.starttls()

    try:
        server.login(sender, password)
        msg = MIMEText(message)
        msg["Subject"] = "Авторизация"
        server.sendmail(sender, 'temiros@mail.ru', msg.as_string() )
        return True
        

        # return Response( data={"emailMessage": "The message was sent successfuly!" }, status=status.HTTP_200_OK)
    except Exception as _ex:
        print(_ex)
        return True
        # return Response( data={"error": "f{_ex} Check your login or password please!"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
       