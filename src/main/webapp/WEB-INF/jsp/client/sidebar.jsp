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
                <a class="nav-link" href="/client/dashboard">
                    <i class="material-icons">dashboard</i>
                    <p> Clients </p>
                </a>
            </li>
        </ul>
    </div>
</div>