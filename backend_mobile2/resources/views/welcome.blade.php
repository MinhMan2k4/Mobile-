<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard</title>
    <!-- Thêm các link đến các file CSS nếu có -->
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
    <!-- Bootstrap (có thể sử dụng nếu cần) -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
</head>
<body>
    <div class="container-fluid">
        <!-- Sidebar -->
        <div class="row">
            <div class="col-md-2 bg-dark text-white vh-100">
                <h3 class="p-3">Admin Panel</h3>
                <ul class="nav flex-column">
                    <li class="nav-item">
                        <a class="nav-link text-white" href="{{ route('admin.products') }}">Quản lý sản phẩm</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="{{ route('admin.categories') }}">Quản lý danh mục</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="{{ route('admin.users') }}">Quản lý người dùng</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="{{ route('admin.carts') }}">Quản lý giỏ hàng</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link text-white" href="{{ route('admin.orders') }}">Quản lý đơn hàng</a>
                    </li>
                </ul>
            </div>

            <!-- Main Content -->
            <div class="col-md-10 p-4">
                <h1>@yield('title')</h1>
                @yield('content')
            </div>
        </div>
    </div>
</body>
</html>
