import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def handler(event: dict, context) -> dict:
    """Отправляет заявку с сайта на почту opora-vprostom@mail.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    social = body.get('social', '').strip()
    request_text = body.get('request', '').strip()
    callback = body.get('callback', False)
    source = body.get('source', 'Сайт')

    if not name:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя обязательно'})
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    from_email = 'opora-vprostom@mail.ru'
    to_email = 'opora-vprostom@mail.ru'

    empty = '<span style="color:#bbb">не указано</span>'

    callback_badge = ''
    if callback:
        callback_badge = '<div style="margin-top:16px;display:inline-block;background:#c4795a;color:white;padding:8px 18px;border-radius:20px;font-size:14px;font-weight:600;">📞 Просит обратный звонок</div>'

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #f9f7f4; padding: 32px; border-radius: 16px;">
      <div style="background: #c4795a; color: white; padding: 20px 28px; border-radius: 12px; margin-bottom: 24px;">
        <div style="font-size: 13px; opacity: 0.85; margin-bottom: 4px;">Новая заявка с сайта</div>
        <div style="font-size: 22px; font-weight: bold;">{source}</div>
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e8e3dc; color: #888; font-size: 13px; width: 150px;">Имя</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e8e3dc; font-size: 15px; font-weight: 600; color: #2a1f14;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e8e3dc; color: #888; font-size: 13px;">Телефон</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e8e3dc; font-size: 15px; color: #2a1f14;">{phone if phone else empty}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e8e3dc; color: #888; font-size: 13px;">Соцсеть</td>
          <td style="padding: 12px 0; border-bottom: 1px solid #e8e3dc; font-size: 15px; color: #2a1f14;">{social if social else empty}</td>
        </tr>
        <tr>
          <td style="padding: 12px 0; color: #888; font-size: 13px; vertical-align: top;">Запрос</td>
          <td style="padding: 12px 0; font-size: 15px; color: #2a1f14; line-height: 1.6;">{request_text if request_text else empty}</td>
        </tr>
      </table>
      {callback_badge}
    </div>
    """

    subject = f'{"📞 " if callback else ""}Новая заявка: {name} — {source}'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = from_email
    msg['To'] = to_email
    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(from_email, smtp_password)
        server.sendmail(from_email, to_email, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
