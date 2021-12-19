# js-library-wangwi12

SheetCloud

- Edit sheet music directly in your website

Check out the Landing page : https://warm-bayou-62373.herokuapp.com/

Check out the Documentation : https://warm-bayou-62373.herokuapp.com/documentation.html

<section class="introSection">
        <h1 class="pageHeading">API Documentation</h1>
        <div class="subHeadingContainer">
          <p class="subHeading">
            SheetCloud is a javascript library that provides a music sheet
            interface for websites. The SheetCloud API allows for interacting
            with the Sheetcloud library.
          </p>
        </div>
      </section>
      <section class="gettingStarted">
        <h2 class="sectionHeading">Getting Started</h2>
        <p class="sectionDescription">
          To setup SheetCloud, ensure the library is in the scope of your
          project. Then, add these script lines to your html file:
        </p>
        <div class="codeBlock">
          <code class="codeText"
            >&lt;script defer type="text/javascript"
            src="js/SheetCloud.js"&gt;&lt;/script&gt;
            <br />
            &lt;link rel="stylesheet" type="text/css" href="js/SheetCloud.css"
            /&gt;
          </code>
        </div>
        <p class="sectionDescription">
        <br/>
          Once the library is imported, a music sheet can be created using these
          library calls:
        </p>
        <div class="codeBlock">
          <code class="codeText">
            const sg = SheetGenerator();
            <br />
            <br />
            sg.makeSheet({ clefs: { treble: true, bass: true }, timeSignatures:
            { upper: 2, lower: 4 }, numStaffs: 1, tempo: 120, items: [] });
            <br />
            <br />
            const sheetHTMLElement = sg.mainView; &nbsp; &nbsp;//sg.mainView is
            the html music sheet that can be inserted into your html page
          </code>
        </div>
      </section>
