from celery import shared_task
from django.conf import settings



# почта
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
       



def mysendmailstandart(message_to_send, subject, getter_email):  
            print(message_to_send)          

            message= message_to_send
            sender = "emailsenderinform@gmail.com"              

            env = environ.Env()
            environ.Env.read_env()
            password = env('EMAIL_PASSWORD_GM') #код от приложения          

            server = smtplib.SMTP("smtp.gmail.com", 587)
            server.starttls()

            try:
                server.login(sender, password)
                msg = MIMEText(message)
                msg["Subject"] = subject
                server.sendmail(sender, getter_email, msg.as_string() )      

                
            except Exception as _ex:

                print(_ex)
            






