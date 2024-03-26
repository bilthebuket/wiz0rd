var userPosition = [0, 0];
var userPositionInMap = [0, 0];
var userVelocity = [0, 0];
var userState = "idle";
var terminate = [false, false];
var w = false;
var a = false;
var s = false;
var d = false;
var m = false;
var hasJumpedInThisFlight = false;
var projectileCount = 0;
var projectileSpeedsX = [];
var projectileSpeedsY = [];
var holding = false;
var level = 1;
var pixelData;

function getPixelColor(imageSrc, x, y)
{
    var img = new Image();
    var url = "file:///H:/My%20Drive/code/wiz0rd/index.html";
    img.src = imageSrc;
    img.src = url + '?' + new Date().getTime();
    img.setAttribute('crossOrigin', '');

    var canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    pixelData = ctx.getImageData(x, y, 1, 1).data;
}

function startGame()
{
    animateSprites();
    updatePositions();
    document.addEventListener('keydown', (event)=>
    {
        if (event.key == 'w')
        {
            w = true;
        }
        if (event.key == 's')
        {
            s = true;
        }
        if (event.key == 'a')
        {
            a = true;
        }
        if (event.key == 'd')
        {
            d = true;
        }
        if (event.key == 'm')
        {
            m = true;
        }
    });
    document.addEventListener('keyup', (event)=>
    {
        if (event.key == 'w')
        {
            w = false;
        }
        if (event.key == 's')
        {
            s = false;
        }
        if (event.key == 'a')
        {
            a = false;
        }
        if (event.key == 'd')
        {
            d = false;
        }
        if (event.key == 'm')
        {
            m = false;
            holding = false;
        }
    });
    document.getElementById("container").style.backgroundImage = "url(lvl" + level + ".png)";
}

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function updatePositions()
{
    if (w && hasJumpedInThisFlight == false)
    {
        userVelocity[1] = 5;
        hasJumpedInThisFlight = true;
    }
    if (a)
    {
        userVelocity[0] = -5;
        document.getElementById("user").style.transform = "scaleX(-1)";
    }
    if (s)
    {
        userVelocity[1] = userVelocity[1] - 3;
    }
    if (d)
    {
        userVelocity[0] = 5;
        document.getElementById("user").style.transform = "";
    }
    if (a == true || d == true)
    {
        userState = "running";
    }
    else
    {
        userState = "idle";
    }
    if (m == true)
    {
        userState = "shooting";
        if (holding == false)
        {
            document.getElementById("user").style.backgroundPositionX = "0px";
            holding = true;
        }
    }

    if (userVelocity[0] > 0)
    {
        userVelocity[0] = userVelocity[0] - 1;
    }
    else
    {
        if (userVelocity[0] < 0)
        {
            userVelocity[0] = userVelocity[0] + 1;
        }
    }
    if (userPosition[1] > 0)
    {
        userVelocity[1] = userVelocity[1] - .1;
    }

    userPosition[0] = userPosition[0] + userVelocity[0];
    if (userPosition[1] + userVelocity[1] > 0)
    {
        userPosition[1] = userPosition[1] + userVelocity[1];
    }
    else
    {
        userPosition[1] = 0;
        userVelocity[1] = 0;
        hasJumpedInThisFlight = false;
    }

    if (userPosition[0] < 0)
    {
        userPosition[0] = 0;
    }
    if (userPosition[0] > 1168)
    {
        userPosition[0] = 1168;
    }
    if (userPosition[1] > 468)
    {
        userPosition[1] = 468;
    }
    if (userPosition[1] < 0)
    {
        userPosition[1] = 0;
        hasJumpedInThisFlight = false;
    }

    for (var i = 0; i < 32; i++)
    {
        getPixelColor("lvl" + level + ".png", parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) + i, parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) + 33);
        if (pixelData[0] == 0 && pixelData[1] == 39 && pixelData[2] == 97)
        {
            if (userVelocity[1] < 0)
            {
                userVelocity[1] = 0;
            }
        }
        getPixelColor("lvl" + level + ".png", parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) + i, parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) - 1);
        if (pixelData[0] == 0 && pixelData[1] == 39 && pixelData[2] == 97)
        {
            if (userVelocity[1] > 0)
            {
                userVelocity[1] = 0;
            }
        }
        getPixelColor("lvl" + level + ".png", parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) + 33, parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) + i);
        if (pixelData[0] == 0 && pixelData[1] == 39 && pixelData[2] == 97)
        {
            if (userVelocity[0] > 0)
            {
                userVelocity[1] = 0;
            }
        }
        getPixelColor("lvl" + level + ".png", parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) - 1, parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) + i);
        if (pixelData[0] == 0 && pixelData[1] == 39 && pixelData[2] == 97)
        {
            if (userVelocity[0] < 0)
            {
                userVelocity[1] = 0;
            }
        }
        getPixelColor("lvl" + level + ".png", 341, 168);
        console.log(pixelData);
        getPixelColor("lvl" + level + ".png", 342, 168);
        console.log(pixelData);
    }

    document.getElementById("user").style.marginLeft = userPosition[0] + "px";
    document.getElementById("user").style.marginTop = 468 - userPosition[1] + "px";

    for (var i = 0; i < projectileCount; i++)
    {
        const proj = document.getElementById(i);
        if (window.getComputedStyle(proj).display == "block")
        {
            if (parseInt(window.getComputedStyle(proj).marginLeft) + projectileSpeedsX[i] >= 1195)
            {
                proj.style.display = "none";
            }
            else
            {
                if (parseInt(window.getComputedStyle(proj).marginLeft) + projectileSpeedsX[i] <= 0)
                {
                    proj.style.display = "none";
                }
                else
                {
                    proj.style.marginLeft = parseInt(window.getComputedStyle(proj).marginLeft) + projectileSpeedsX[i] + "px";
                }
            }
        }
    }

    if (terminate[0] == false)
    {
        requestAnimationFrame(updatePositions);
    }
}

async function animateSprites()
{
    await sleep(50);
    if (userState == "idle")
    {
        document.getElementById("user").style.backgroundPositionY = "0px";
        if (parseInt(window.getComputedStyle(document.getElementById("user")).backgroundPositionX) - 32 < -288)
        {
            document.getElementById("user").style.backgroundPositionX = "0px";
        }
        else
        {
            document.getElementById("user").style.backgroundPositionX = parseInt(window.getComputedStyle(document.getElementById("user")).backgroundPositionX) - 32 + "px";
        }
    }
    if (userState == "running")
    {
        document.getElementById("user").style.backgroundPositionY = "-64px";
        if (parseInt(window.getComputedStyle(document.getElementById("user")).backgroundPositionX) - 32 < -288)
        {
            document.getElementById("user").style.backgroundPositionX = "0px";
        }
        else
        {
            document.getElementById("user").style.backgroundPositionX = parseInt(window.getComputedStyle(document.getElementById("user")).backgroundPositionX) - 32 + "px";
        }
    }
    if (userState == "shooting")
    {
        document.getElementById("user").style.backgroundPositionY = "-96px";
        if (parseInt(window.getComputedStyle(document.getElementById("user")).backgroundPositionX) - 32 < -288)
        {
            document.getElementById("user").style.backgroundPositionX = "0px";
        }
        else
        {
            document.getElementById("user").style.backgroundPositionX = parseInt(window.getComputedStyle(document.getElementById("user")).backgroundPositionX) - 32 + "px";
        }
        if (parseInt(window.getComputedStyle(document.getElementById("user")).backgroundPositionX) == -160)
        {
            createUserProjectile();
        }
    }

    for (var i = 0; i < projectileCount; i++)
    {
        const proj = document.getElementById(i);
        if (parseInt(window.getComputedStyle(proj).backgroundPositionX) - 5 < -45)
        {
            proj.style.backgroundPositionX = "0px";
        }
        else
        {
            proj.style.backgroundPositionX = parseInt(window.getComputedStyle(proj).backgroundPositionX) - 5 + "px";
        }
    }

    if (terminate[1] == false)
    {
        requestAnimationFrame(animateSprites);
    }
}

function createUserProjectile()
{
    var div = document.createElement("div");
    div.setAttribute("id", projectileCount);
    div.style.height = "5px";
    div.style.width = "5px";
    div.style.backgroundImage = "url(userSprite/projectile.png)";
    div.style.position = "absolute";
    div.style.marginLeft = parseInt(window.getComputedStyle(document.getElementById("user")).marginLeft) + 22 + "px";
    div.style.marginTop = parseInt(window.getComputedStyle(document.getElementById("user")).marginTop) + 16 + "px";
    div.style.backgroundPositionX = "0px";
    document.getElementById("container").appendChild(div);
    if ((window.getComputedStyle(document.getElementById("user")).transform) == "matrix(-1, 0, 0, 1, 0, 0)")
    {
        projectileSpeedsX.push(-5);
        div.style.transform = "scaleX(-1)";
    }
    else
    {
        projectileSpeedsX.push(5);
    }
    projectileSpeedsY.push(0);
    projectileCount++;
    debugger;
}