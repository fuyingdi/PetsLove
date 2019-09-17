api:  
```
1.index页面显示 
/post/getPostInfoList  
用户端：
    [
        page(number) 当前页数
        query_time(timestamp) 查询时间
    ]
服务器：  
    [  
        （以下对象共五个）
        {
        post_id  
        avatar(url)帖子创建者的头像  
        nickname(text)  
        outline(text)长度在80个字符之内  
        picture(array)数组内容只有纯粹的String格式的url，照片不超过3张  
        visitor_number(number)  
        }
    ]  


2. showPost页面显示
/post/getPostItem
用户端：
    {
        post_id
        query_time(timestamp)第一次查询的时间，如果向上划看更多帖子则用同一个timestamp,如果向下滑刷新则发送新的timestamp
        page(number)查看的第几页，假设每页5条回复
    }

服务端：
    第一个response传递帖子信息
    {
        post_id
        avatar(url) 帖子创建者的头像
        nickname(text)
        title(text)
        content(text)
        picture(array)同postInfo
        liked(boolean)
        collected(boolean)
    }

    第二个response传递五条回复信息
    [
        以下对象重复五次
        {
            floor_id
            avatar(url)
            nickname(text)
            cite_content(text)
            reply_content(text)
        }
    ]
    
3.回复
/post/replyPost
用户端：
    {
        id(post_id)
        reply(text)回复的内容
    }
/post/replyFloor
    {
        id(floor_id)
        reply(text)回复的内容
    }

4.上传帖子
/post/addPost
用户端：
待“发帖”键按下后，先发送图片（递归到图片发送完毕），发送标题和文字。
    {
        picture   好几张递归
        title
        content
    }
服务端：


5.上传转让帖
/market/addTrade
待“发帖”键按下后，先发送图片（递归到图片发送完毕），发送其他信息
用户端：
    {
        title
        content
        bleed(text) 转让的宠物品种
        prospective_price 预期价格
        picture 好几张递归
    }


```