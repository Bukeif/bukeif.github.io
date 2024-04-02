cd "G:\VM_box"
VBoxManage.exe modifyvm "Mac_OS14" --cpuidset 00000001 000106e5 00100800 0098e3fd bfebfbff

VBoxManage setextradata "Mac_OS14" VBoxInternal/Devices/efi/0/Config/DmiSystemProduct “MacBookPro15,1”

VBoxManage setextradata "Mac_OS14" "VBoxInternal/Devices/efi/0/Config/DmiBoardProduct" "Mac-551B86E5744E2388"

VBoxManage setextradata "Mac_OS14" "VBoxInternal/Devices/smc/0/Config/DeviceKey" "ourhardworkbythesewordsguardedpleasedontsteal(c)AppleComputerInc"

VBoxManage setextradata "Mac_OS14" "VBoxInternal/Devices/smc/0/Config/GetKeyFromRealSMC" 1


#如果是使用 AMD CPU 的電腦，請多加入下面這一行

VBoxManage modifyvm "Mac_OS14" --cpu-profile "Intel Core i7-6700K"