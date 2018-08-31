<div class="sidebar" data-active-color="rose" data-background-color="black">
<!--
  Tip 1: You can change the color of active element of the sidebar using: data-active-color="purple | blue | green | orange | red | rose"
  Tip 2: you can also add an image using data-image tag
  Tip 3: you can change the color of the sidebar with data-background-color="white | black"
-->
    <div class="logo">
        <a href="/client/dashboard" class="simple-text logo-mini">
             
        </a>
        <a href="/client/dashboard" class="simple-text logo-normal">
            CRM DEMO
        </a>
    </div>
    <div class="sidebar-wrapper">
        <ul class="nav">
            <li ng-class="{active: activetab =='/'}">
                <a href="/admin/dashboard">
                    <i class="material-icons">dashboard</i>
                    <p> Dashboard </p>
                </a>
            </li>
            <li>
                <a data-toggle="collapse" data-target="#orgNavBar" href="javascript:void(0)">
                    <i class="material-icons">business_center</i>
                    <p> Organizations
                        <b class="caret"></b>
                    </p>
                </a>
                <div class="collapse" id="orgNavBar">
                    <ul class="nav">
                        <li ng-class="{active: activetab =='/charityfield'}">
                            <a href="/client/organization#/charityfield">
                                <span class="sidebar-mini"> CF </span>
                                <span class="sidebar-normal"> Charity Fields </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</div>