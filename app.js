// express module 불러워서 express 변수에 저장 
var express = require('express');

// http module 불러와서 http 변수에 저장 
var http = require('http');

// body-parser module 불러와서 bodyPraser 변수에 저장 
var bodyParser = require('body-parser');

// express 객체를 app 변수에 저장 
var app = express();

// body-parser 미들웨어 사용 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/keyboard', function(req, res) {
    
  var data = {
    'type': 'buttons',
    'buttons': ['입금', '출금', '로그인', '인증', '먼지', '상장', '입/출금지연', '2단계 인증(2FA/OTP)', '바이낸스야']
  };
  res.json(data);

});

http.createServer(app).listen(9090, function() {
  console.log('서버 실행 중..');
});

// http://ip/message
app.post('/message', function(req, res) {
    //user input data 
  var msg = req.body.content;
  console.log('전달받은 메시지: ' + msg);

  var send = {}; //res data 

  switch(msg) {
    case '입금':
      send = {
        'message': {
          'text': '계좌 입금 내역이 확인되지 않을 때에는 TxID(트랜잭션 아이디, 거래 코드)를 가지고 블록체인 네트워크 상에서 해당 코인의 처리 현황을 직접 수시로 확인할 수 있습니다. 더 자세한 내용은 바이낸스 웹사이트를 참고해주세요. :)'
        }

      }
      break;

    case '출금':
      send = {
        'message': {
          'text': '출금한 금액이 분실됐다고 판단되는 경우, 우선 마이페이지의 [분배 기록(Distribution History)]에서 해당 기록을 먼저 확인해주세요. 보통 30~60분 내 TxID(트랜잭션 아이디/거래 코드)가 생성됩니다. 이는 바이낸스가 이미 해당 블록체인으로 거래를 처리하고 있다는 것을 의미합니다. TxID를 확보했다면 TxID 오른쪽의 "확인(Check)”을 클릭해서 블록 체인의 상태 및 컨펌 여부를 확인해주세요. 더 자세한 내용은 바이낸스 웹사이트를 참고해주세요. :) '
        }

      }
      break;

    case '로그인':
      send = {
        'message': {
          'text': '실수로 계정이 잠겼을 경우에는(frozen) 바이낸스에 로그인한 뒤에 다시 활성화하기(Reactivate)를 클릭하면됩니다. 참고로 고객 지원 서비스를 통해 계정 잠금을 푸는데에는 약 7-10일이 걸립니다. ㅠ.ㅠ 자세한 내용은 바이낸스 웹사이트 FAQ를 참고해주세요! :) '
        }        

      }
      break;

    case '인증':
      send = {
        'message': {
          'text': '구글 2단계 인증(2FA/OTP)은 바이낸스에 로그인한 후 마이페이지에서 구글(OTP)인증 활성화를 클릭해주시면 됩니다. 더 자세한 내용은 바이낸스 웹사이트 FAQ를 참고해주세요! :) '
        
        }

      }
      break;

    case '먼지':
      send = {
        'message': {
         'text': '소량의 잔고를 BNB로 전환할 수 있습니다. 그 방법은 “펀드"를 먼저 클릭 합니다— "자산"탭으로 들어가서 "Conver to BNB"를 클릭합니다. 그러면  "Pending Exchange Funds"페이지로 리디렉션됩니다'
        }

      }
      break;
          
    case '상장':
      send = {
        'message': {
         'text': '바이낸스에 코인 상장을 제안하고 싶다면 코어팀에게 신청서 https://goo.gl/forms/jwjm8SClOYEuC8hr1 를 보내주세요. :) 
        }

      }
      break;

    case '입/출금지연':
      send = {
        'message': {
         'text': '입/출금이 느리게 처리되는 경우에는 거래 ID인 TxID를 받았는지 확인해주세요. 거래 ID를 가지고 있는 경우, 해당 블록 체인에서 거래 상태를 모니터링해봐야합니다. 만약 각각의 블록체인에서 여러번 컨펌이 끝난 이후에도 바이낸스 잔고의 변화가 없다면, 저희가 더 자세히 확인해볼 수 있도록 바이낸스 웹사이트 '문의등록'으로 등록된 이메일과 TxID를 보내주세요.
        }

      }
      break;
          
    case '2단계 인증(2FA/OTP)':
      send = {
        'message': {
         'text': '2FA 애플리케이션에서 유효한 2FA 키가 갑자기 멈춘 경우, 먼저 두 기기의 시간이 서로 일치하는 지 확인해주세요. 문제가 해결되지 않거나 휴대 전화에 접근할 수 없거나 백업 키를 저장하지 않은 경우, 데스크탑 웹 사이트에서 기존 2FA를 비활성화해야 합니다. 그리고 다시 등록해주세요. 
        }

      }
          

      break;        
    case '바이낸스야':
      send = {
        'message': {
         'text': '저도 사랑합니다♥'
        }

      }
      break;

    default:
      send = {

      }
      break;
  }
  res.json(send); // send 변수에 저장된 데이터 전달 
});
