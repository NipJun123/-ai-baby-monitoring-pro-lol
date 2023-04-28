status=""
objects=[]

function setup()
{
    canvas = createCanvas(700,600)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
}

function preload()
{
    alarm = loadSound("m.wav")

}

function draw()
{
    image(video, 0, 0, 700, 600)

    if(status!="")
    {
        objectDetector.detect(video, gotResults)

        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status1").innerHTML = "Objects Detected"

            fill('#FF0000')
            percent = floor(objects[i].confidence * 100)
            text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y + 15)
            noFill()
            stroke('#FF0000')
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if(objects[i].label=="person")
            {
                document.getElementById("status1").innerHTML = "Baby Found"
                alarm.stop()
            }
            else
            {
                document.getElementById("status1").innerHTML = "Baby not Found"
                alarm.play()
            }
        }
    
    }

    
}

function ModelLoaded()
{
    console.log("Model Loaded!!!!!!!")
    document.getElementById("status1").innerHTML = "Detecting Objects"
}

function start()
{
    objectDetector= ml5.objectDetector('cocossd', ModelLoaded)
    status = true;
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(results)
        objects= results
    }

}