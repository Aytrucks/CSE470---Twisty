//
//CSE 470 HW 1 TWISTY!  
//
/*
Written by: Anish Nalla
Date: Jan 2021

Description: 
This program ..... HW470: COMPLETE THIS. DESCRIBE WHAT YOU DID.
*/

var canvas;
var gl;

//store the vertices
//Each triplet represents one triangle
var vertices = [];

//store a color for each vertex
var colors = [];
var colorTimer = 0;
var colorTimerLoc;

var colorTimer2 = 0;
var colorTimerLoc2;

var colorTimer3 = 0;
var colorTimerLoc3;

//HW470: control the rotation
//(Your variable here)
var theta = 0.0;
var thetaLoc;
var deltaRadians = 0.05;
var direction = true;
var timer = 0;
//HW470: control the redraw rate
var delay = 20;

// =============== function init ======================
 
// When the page is loaded into the browser, start webgl stuff
window.onload = function init()
{
	// notice that gl-canvas is specified in the html code
    canvas = document.getElementById( "gl-canvas" );
    
	// gl is a canvas object
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

	// Track progress of the program with print statement
    console.log("Opened canvas");
        
    //HW470:
    // Define  data for object 
	// See HW specs for number of vertices  required
	// Recommendation: each set of three points corresponds to a triangle.
	// Here is one triangle. You can use parametric equations, for example of a circle to generate (x,y) values
	
    
    //This is gonna be some sort of frog/alien space ship kinda thing
    //The verticies are made to be created as seperate triangle strips that look combined when properly coded
    //Some triangles go under other triangles to maintain the illusion of how the parts appear under other objects
    vertices = [
        vec2(0, 0.5),
        vec2(-.5, 0),
        vec2(.5, 0),
        vec2(0,-0.9),
        vec2(-0.5,0),
        vec2(-0.8,0),
        vec2(-0.6,0.8),
        vec2(-0.5,0),
        vec2(0.5,0),
        vec2(0.8,0),
        vec2(0.6,0.8),
        vec2(0.5,0),
        vec2(-0.5,0),
        vec2(-0.8,0),
        vec2(0,-0.9),
        vec2(0.5,0),
        vec2(0.8,0),
        vec2(0,-0.9),
        vec2(-0.5,-0.2),
        vec2(-0.7,-0.6),
        vec2(0,-0.2),
        vec2(0.5,-0.2),
        vec2(0.7,-0.6),
        vec2(0,-0.2),
        vec2(-0.7,-0.6),
        vec2(-0.5,-0.75),
        vec2(-0.5,-0.25),
        vec2(0.7,-0.6),
        vec2(0.5,-0.75),
        vec2(0.5,-0.25),
        vec2(0,0.75),
        vec2(-0.25,0),
        vec2(0.25,0)
    ];
	 
	
	//HW470: Create colors for the core and outer parts
	// See HW specs for the number of colors needed
	// for(var i=0; i < vertices.length; i++) {
	// 	//colors.push(vec3(1.0, 1.0, 1.0));
        
	// };
	 
	 
	
	
	// HW470: Print the input vertices and colors to the console
	console.log("Input vertices and colors:");
	 
	

    //  Configure WebGL
    gl.viewport( 0, 0, canvas.width, canvas.height );
	// Background color to white
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );

    //  Define shaders to use  
    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );

    // Load the data into the GPU
	//
	// color buffer: create, bind, and load
    var cBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, cBuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW );
	
	// Associate shader variable for  r,g,b color
	var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );
    
    // vertex buffer: create, bind, load
    var vbuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vbuffer );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );

    // Associate shader variables for x,y vertices	
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
	
	//HW470: associate shader explode variable ("Loc" variables defined here) 
    thetaLoc = gl.getUniformLocation( program, "theta" );
    colorTimerLoc = gl.getUniformLocation(program, "colorTimer");
    colorTimerLoc2 = gl.getUniformLocation(program, "colorTimer2");
    colorTimerLoc3 = gl.getUniformLocation(program, "colorTimer3");
    
    console.log("Data loaded to GPU -- Now call render");

    render();
};


// =============== function render ======================

function render()
{
    //console.log("renderd");
    var pointSize;
    pointSize = 100;
    // clear the screen 
    gl.clear( gl.COLOR_BUFFER_BIT );
	
	//HW470: send uniform(s) to vertex shader
	
    theta += (direction ? deltaRadians : -deltaRadians);
    gl.uniform1f(thetaLoc, theta);
    colors.push(vec3(theta,theta,theta));
    
	timer += 0.05;
    colorTimer += (direction ? 0.01 : -0.01);
    colorTimer2 += (direction ? 0.02 : -0.02);
    colorTimer3 += (direction ? 0.01 : -0.01);

    
    gl.uniform1f(colorTimerLoc,colorTimer);
    gl.uniform1f(colorTimerLoc2,colorTimer2);
    gl.uniform1f(colorTimerLoc3,colorTimer3/2);

    //console.log(timer);
    if(timer > 6.4){
        console.log("HJIT");
        direction = !direction;
        // deltaRadians = deltaRadians * 2;
        // if(deltaRadians > 100){
        //     deltaRadians = 0.05;
        //     theta = 0;
        // }
        timer = 0;
    }
    //console.log(colorTimer);
    console.log(theta);
	//HW470: draw the object
	// You will need to change this to create the twisting outer parts effect
	// Hint: you will need more than one draw function call
    gl.drawArrays(gl.TRIANGLE_STRIP,24,3)
    gl.drawArrays(gl.TRIANGLE_STRIP,27,3)
    
    gl.drawArrays(gl.TRIANGLE_STRIP,30,3)
    

    
    gl.drawArrays(gl.TRIANGLE_STRIP,18,3)
    gl.drawArrays(gl.TRIANGLE_STRIP,21,3)
    
    gl.drawArrays(gl.TRIANGLE_STRIP,0,5)

    gl.uniform1f(thetaLoc,0.0);
    
    gl.uniform1f(colorTimerLoc,0.1);
    gl.uniform1f(colorTimerLoc2,0.9);
    gl.uniform1f(colorTimerLoc3,0.9);
    gl.drawArrays(gl.TRIANGLE_STRIP, 4, 4);
    
    gl.uniform1f(colorTimerLoc,0.1);
    gl.uniform1f(colorTimerLoc2,0.0);
    gl.uniform1f(colorTimerLoc3,0.9);  
    gl.drawArrays(gl.TRIANGLE_STRIP, 8, 4);
    
    gl.uniform1f(colorTimerLoc,0.9);
    gl.uniform1f(colorTimerLoc2,0.4);
    gl.uniform1f(colorTimerLoc3,0.6);
    gl.drawArrays(gl.TRIANGLE_STRIP,12,3);
    
    gl.uniform1f(colorTimerLoc,0.8);
    gl.uniform1f(colorTimerLoc2,0.9);
    gl.uniform1f(colorTimerLoc3,0.1);

    gl.drawArrays(gl.TRIANGLE_STRIP,15,3) 
      
    //gl.drawArrays(gl.POINT, 2,1);


	 
	
	//re-render after delay
	setTimeout(function (){requestAnimFrame(render);}, delay);
    
    //gl.drawArrays(gl.TRIANGLES,0,-vertices.length)
}

