# react-now-next-iplayer
## React Now/Next
This is a demo website of a simple React based 16:9 TV overlay using HTML5 graphics.

## Page Layout
The page is laid out into three vertical segments, top middle and bottom.

The top segment is subdivided horizontally into left, middle and right.

Left and right segments have optional demonstration graphical elements.

The middle segment is currently unused.

The bottom segment is a single, full width item with now/next data.

Customisation using url parameters
DoG customisation
The left and right DoG items are disabled by default. Enable them with tl=yes and/or tr=yes url parameters.

Now/Next customisation
The Now/Next feature uses the Dazzler Now/Next api which is experimental. Other APIs can be plumbed in.

It can be configured with the following url parameters:

**sid** specifies the channel to retrieve data from. if not present, 'History_Channel' is used.

**env** can be 'test' or 'live', defaults to 'live'

**region** is the AWS region the channel is running in, defaults to eu-west-2

**minDuration** is the minimum duration of a programme to be included in the now next display, as an ISO 8601 duration. Default 'PT2M'.
(previewMinutes is the time before the start of the next programme when the next display will start to be shown, as integer minutes, default '2'.)

**styling** set the styling of the pop up bar. styling can be set to 'grownup' or 'children'. styling will
default to 'grownup' if not passed as a url parameter.

**uvpids** can be used to specify the items that the "Upcoming" overlay should be displayed over e.g. uvpids=somepis,anotherpid The "Upcoming" overlay is hard coded to display for 15 seconds, it will fade in and disappears abruptly. 

Further customisation
The file App.js contains all the logic for the programme. It can be modified to change the styling of the Now/Next information or the DoG urls or any element of the page.

These defaults are hard coded:

Interval between polling for now/next information: 5 seconds.
now/next will be shown during the first 12 seconds of every 1/2 minute.
time to fade in the lower third: 1 second
time to slide in the now or next: xxxx second

## Deployment

Currently the react-now-next-iplayer is being deployed to the following AWS S3 bucket in the World Service,
AWS Prod account:

**ws-dazzler-web-statics**

To deploy any changes to the React Now Next do the following:

1. In VSCode open a terminal.
2. Run the following comand to build the project:
```npm run build```
3. On the command line use the AWS cli to upload the new build folder into the **ws-dazzler-web-statics** bucket.
    - In the terminal switch your AWS_PROFILE to the **Prod** account e.g.
    ```export AWS_PROFILE=prod```
    ```windows set AWS_PROFILE=prod```
    NOTE: On my machine **prod** is the alias for the AWS PROD account. On your machine it might be different! To list the available AWS profiles on your machine use the following command:
    ```aws configure list-profiles```
    - Use either the AWS cli ***sync*** or ***cp*** commands to copy the build folder into the **ws-dazzler-web-statics** S3 bucket e.g.
    ```aws s3 sync build/ s3://ws-dazzler-web-statics```
    or
    ```aws s3 cp --recursive --acl public-read build/ s3://ws-dazzler-web-statics```
    - After upload test that your changes are visible by loading the ***React Now Next*** in the web browser using the following url e.g.
    [https://ws-dazzler-web-statics.s3.eu-west-1.amazonaws.com/index.html](https://ws-dazzler-web-statics.s3.eu-west-1.amazonaws.com/index.html)

    ***NOTE***: All example commands above are for a ***MAC OS/linux*** machine, ***Windows*** commands might be different!

## Project setup and building

In the root folder of this project there is a special file called ***.env***. This file contains an override value for PUBLIC_URL used in the REACT Application.  This value is used to make the paths to the assets used in this application absolute http paths that are also valid AWS S3 paths. It gets used when ever the ```npm run build``` command is executed!

If this application is ever deployed to a different AWS S3 bucket, please update the value of PUBLIC_URL in ***.env***, so that it is set to the 'https' path, of the index.html file's new location!



[PUBLIC_URL Background...](https://stackoverflow.com/questions/42686149/cant-build-create-react-app-project-with-custom-public-url)










