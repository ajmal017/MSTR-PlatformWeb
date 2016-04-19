<?php

include_once 'Server.php';

class UserServer extends Server {

    public function run() {
        parent::run();
        switch ($this->_requestParameters->type) {
                case"USER_SEARCH_INDEX";
                    $this->searchIndex();
                    break;
                case"USER_SEARCH_STOCK";
                    $this->searchStock();
                    break;
                case"USER_SEARCH_OPTION";
                    $this->searchOption();
                    break;
                default :
                    $this->_response["success"] = false;
                    $this->_response["errmsg"] = "Invalid Params";
            }
//        if (!$this->openConnction()) {
//            return $this->_response;
//        } else {
//            
//        }


        $this->closeConnection();
    }
    public function searchIndex() {
        $ch = curl_init();
        $url = 'http://apis.baidu.com/apistore/stockservice/hkstock?stockid=00168&list=1';
        $header = array(
            'apikey: a0ac90feda5331bcfe46735bc71f9fb6',
        );
        // 添加apikey到header
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // 执行HTTP请求
        curl_setopt($ch, CURLOPT_URL, $url);
        $res = curl_exec($ch);
        $json = json_decode($res);
        if ($json->errNum === 0) {
            $json = json_decode($res);
            $this->_response["success"] = TRUE;
            $this->_response["errmsg"] = $json->errMsg;
            $this->_response["content"] = $json->retData;
        } else {
            $this->_response["success"] = FALSE;
            $this->_response["errmsg"] = "Index Search Fail" . $json->errMsg;
        }
    }

    public function searchStock() {
        $SID = $this->_requestParameters->data->s_id;

//        $url = "http://ichart.finance.yahoo.com/table.csv?s=" . $SID . ".hk&d=8&e=4&f=2015&g=d&a=0&b=4&c=2014&ignore=.csv";
        $url = "http://ichart.finance.yahoo.com/table.csv?s=" . $SID . ".hk&a=0&b=1&c=2015&ignore=.csv";
//        $url2 = "http://hkbuebank.azurewebsites.net/api/stock/result?code=00001";
        $content = file_get_contents($url);
        $arr = explode("\n", $content);

        $tem = 0;
        $res = array();
        $res_date = array();
        $k_data = array();
        $k_date = array();
        while ($arr[$tem]) {
            $exp = explode(",", $arr[$tem]);
//            $res[] = $exp[6];
            array_push($res, $exp[6]);
            array_push($res_date, $exp[0]);
//            $res_date[] = $exp[0];
            if ($tem !== 0) {
//                $k_data[] = array($exp[1], $exp[4], $exp[3], $exp[2]);
                $k_tem = array($exp[1], $exp[4], $exp[3], $exp[2]);
                array_push($k_data, $k_tem);
                array_push($k_date, $exp[0]);
//                $k_date[] = $exp[0];
            }

            $tem++;
        }


        $ch = curl_init();
        $url = 'http://apis.baidu.com/apistore/stockservice/hkstock?stockid=0' . $SID . '&list=1';
        $header = array(
            'apikey: a0ac90feda5331bcfe46735bc71f9fb6',
        );
        // 添加apikey到header
        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // 执行HTTP请求
        curl_setopt($ch, CURLOPT_URL, $url);
        $cur_res = curl_exec($ch);

        $json = json_decode($cur_res);

        if (!$content || !$cur_res) {
            $this->_response["success"] = FALSE;
            $this->_response["errmsg"] = "Search Fail - " . $json->errMsg;
        } else {
            $this->_response["success"] = TRUE;
            $this->_response["errmsg"] = "Search Success!";
            $this->_response["content"]["price"] = $res;
            $this->_response["content"]["date"] = $res_date;
            $this->_response["Kchart"]["data"] = array_reverse($k_data);
            $this->_response["Kchart"]["date"] = array_reverse($k_date);
            $this->_response["content"]["current"] = $json->retData;
        }
    }

    public function searchOption() {

//        $SID = $this->_requestParameters->data->s_id;
        function searchTrans($code) {
            $url = "http://hq.sinajs.cn/list=" . $code;
            $content = file_get_contents($url);
            $arr = json_encode($content);
            $arr = explode("\\", $arr);
            $aee = explode("\"", $arr[1]);
            $arr = explode(",", $aee[1]);
            
            return $arr;
        }

        $url = "http://hq.sinajs.cn/list=OP_UP_5100501601";
        $content = file_get_contents($url);
        $arr = json_encode($content);
        $arr = explode("\\", $arr);
        $aee = explode("\"", $arr[1]);
        $arr = explode(",", $aee[1]);



        $tem = 0;
        $res = array();
        while ($arr[$tem]) {

            array_push($res, $arr[$tem]);
            $tem++;
        }
        $add = 0;

        while ($res[$add]) {

            $high = searchTrans($res[$add]);
            $add ++;
        }




        $this->_response["success"] = TRUE;
        $this->_response["errmsg"] = "Search Success!";
        $this->_response["content"] = $res;


//        $tem = 0;
//        $res = array();
//        $res_date = array();
//        $k_data = array();
//        $k_date = array();
//        while ($arr[$tem]) {
//            $exp = explode(",", $arr[$tem]);
////            $res[] = $exp[6];
//            array_push($res, $exp[6]);
//            array_push($res_date, $exp[0]);
////            $res_date[] = $exp[0];
//            if ($tem !== 0) {
////                $k_data[] = array($exp[1], $exp[4], $exp[3], $exp[2]);
//                $k_tem = array($exp[1], $exp[4], $exp[3], $exp[2]);
//                array_push($k_data, $k_tem);
//                array_push($k_date, $exp[0]);
////                $k_date[] = $exp[0];
//            }
//
//            $tem++;
//        }
//
//
//        $ch = curl_init();
//        $url = 'http://hq.sinajs.cn/list=OP_UP_5100501601';
//        $header = array(
//            'apikey: a0ac90feda5331bcfe46735bc71f9fb6',
//        );
//        // 添加apikey到header
//        curl_setopt($ch, CURLOPT_HTTPHEADER, $header);
//        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
//        // 执行HTTP请求
//        curl_setopt($ch, CURLOPT_URL, $url);
//        $cur_res = curl_exec($ch);
//
//        $json = json_decode($cur_res);
//
//        if (!$content || !$cur_res) {
//            $this->_response["success"] = FALSE;
//            $this->_response["errmsg"] = "Search Fail - " . $json->errMsg;
//        } else {
//            $this->_response["success"] = TRUE;
//            $this->_response["errmsg"] = "Search Success!";
//            $this->_response["content"]["price"] = $res;
//            $this->_response["content"]["date"] = $res_date;
//            $this->_response["Kchart"]["data"] = array_reverse($k_data);
//            $this->_response["Kchart"]["date"] = array_reverse($k_date);
//            $this->_response["content"]["current"] = $json->retData;
//        }
    }

}

?>