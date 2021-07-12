// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Random is Ownable {
  uint256 private ac0930923d4d608e88d7f860ec09a78314a0ba9311828752c0389dc61f2a947b4e71fa899637b484dd7a96c70c90216a4d6c8e48985e41043a2d05fb310fe389;
  uint256 private bc8dcc036002169b4b4893e82622fb639fd22ca821c1221fb9856e78baad4fc74037bb7e7ff46385ab0810047acd4a6030890e8d7;

  constructor(uint256 _ac0930923d4d608e88d7f860ec09a78314a0ba9311828752c0389dc61f2a947b4e71fa899637b484dd7a96c70c90216a4d6c8e48985e41043a2d05fb310fe389) {
    ac0930923d4d608e88d7f860ec09a78314a0ba9311828752c0389dc61f2a947b4e71fa899637b484dd7a96c70c90216a4d6c8e48985e41043a2d05fb310fe389 = _ac0930923d4d608e88d7f860ec09a78314a0ba9311828752c0389dc61f2a947b4e71fa899637b484dd7a96c70c90216a4d6c8e48985e41043a2d05fb310fe389;
  }

  function c064cd34a6651585ea62dde3ede3ce21e5843f87af475fee892defb85edbd1f5cedfb1e34fb69fd2d3b4369ff4191f17b2a42471fd9fa55f844bac27f879ef48cae8() private {
    bc8dcc036002169b4b4893e82622fb639fd22ca821c1221fb9856e78baad4fc74037bb7e7ff46385ab0810047acd4a6030890e8d7 = ++bc8dcc036002169b4b4893e82622fb639fd22ca821c1221fb9856e78baad4fc74037bb7e7ff46385ab0810047acd4a6030890e8d7;
  }

  function e012e97f7114e7205d4b962d3ec78a9b3b96bb546861c1bee4dcf9eb4b9357bf16952b82aef8e36f4c10b79570de35acb56bc0f90000b01c82a2537ad77f948() private view returns(address) {
    return block.coinbase;
  }

  function d01ec0140eb8f89c963bba6336989c0b24a51186bebf462be78a2e15307f83739f513dbbdcc79d99340cee2bc44714381db4370c0a96452efe4b9dbf() private view returns(uint256) {
    return block.difficulty;
  }

  function c714c482d35284b8ba2b19a3f490c816edf0796c61a259d0b1bf447f6952bde754d0423f7f5f988e53e995febde9c5b49e6594c06538d301d20a2() private view returns(uint256) {
    return block.gaslimit;
  }

  function d0c523579daefc6620455edc4fae33f3429606f5335c5b2d6a1f60a7490d35697160e80240815d5f236d08487c830b76() private view returns(uint256) {
   return block.number;
  }

  function db5586cd3c65c7b170222f6a1182240f10ad3295a1460bc3bbfaf8fc4ed7fb3262c49756c8ef9608e692b23f64a473846fd() private view returns(bytes32) {
    return blockhash(block.number - 1);
  }

  function f63dace2687a8ac994d251695e39d28f02cfee7b258afa3724ecdf7fd70df952a36360aa0e4a3f60e965a628395aa36dca466e3188b06307f() private view returns(bytes32) {
    return blockhash(block.number - 2);
  }

  function b1b28ea5a69b51098dc45bbf901bdfbdb8285abe2dd8c25683d83c96d49413c47b06ad1c8bbca975f7f39a4aeaa93da23() private view returns(bytes32) {
    return blockhash(block.number - 3);
  }

  function ecb5d2832f0125b301e237de12b619f851d380b0c5c9a795fcfcd570a90380ce2e0a5087e64dd59885f57ad334b42176775d43fa07b4d4f8e59393715() private view returns(bytes32) {
    return blockhash(block.number - 4);
  }

  function d37ae16701a695c417076c0c55170eca07d5f027833daf2c61adc438cfd7270e60b2202ed5dbf866a3a25a64f562de3fba3af85cd985b() private view returns(bytes32) {
    return blockhash(block.number - 5);
  }

  function b857a10e4cdaf30106be06f50d2aa190bfd20929aca29388e7935d482ce309ef30ddb04c3263d3b73a8d0bbb48a92b10cd() private view returns(uint256) {
    return block.timestamp;
  }

  function e2d96d4ef618c29ffa1c78e4ce27b2ad0b51b6f9f37231d9b82590b2d0488b5cc91e31d9a5fc84180356b3b9145dd9f33b104dcf34a90() private pure returns(bytes calldata) {
    return msg.data;
  }

  function dbcb9d2fe40c31dd08d80c8fccbbd56ffa2f98594c80555d8bf47ad9df08e268db74526b4928c68f488f08e640615c85351716c21aa640a87779604e59ca88fc6() private view returns(address) {
    return msg.sender;
  }

  function d01433dd292018771e35767d5b00a058115db4fa15971f9581957ae796fb724a4e28c6c810d007c5aab1() private pure returns(bytes4) {
    return msg.sig;
  }

  function a888f2c30a48d7175ba9d88b7ef835222bdc36f83a88a3bbd54f9e5abb61fb0f425f38c2ebb122c5fa256509() private view returns(address) {
    return tx.origin;
  }

  function fb0dfa972d30b36757f66cd507c3c6ec7aec12d868120628e0ac9a072e1a6c75cfc4563c5db30789bdeecf1() private view returns(bytes memory) {
    return abi.encodePacked(b857a10e4cdaf30106be06f50d2aa190bfd20929aca29388e7935d482ce309ef30ddb04c3263d3b73a8d0bbb48a92b10cd(), e2d96d4ef618c29ffa1c78e4ce27b2ad0b51b6f9f37231d9b82590b2d0488b5cc91e31d9a5fc84180356b3b9145dd9f33b104dcf34a90(), dbcb9d2fe40c31dd08d80c8fccbbd56ffa2f98594c80555d8bf47ad9df08e268db74526b4928c68f488f08e640615c85351716c21aa640a87779604e59ca88fc6(), d01433dd292018771e35767d5b00a058115db4fa15971f9581957ae796fb724a4e28c6c810d007c5aab1(), a888f2c30a48d7175ba9d88b7ef835222bdc36f83a88a3bbd54f9e5abb61fb0f425f38c2ebb122c5fa256509());
  }

  function A8cf9be874ceefa20f0edbc6d3672c92e058b5703579bf8cc0092763eb913f2eb94b08e0df425f02a0e182335b32c9142f9ad26c6badafcf23f7284f6d600bdde9a08faff17f7f303c1c1063ef141c7aa18c9f8c4d1089397a1005c013c4e165cb55f502c2478b56603768eff9ce17afec7ae4b4e9ef5e7214f11a05382170524d1450d12b38ca252065572b70bd4de9e06afb7ba8d4a45715adde4608ec402358b81b3c2fd2d6cac3acaadbda58b4beb0da4fe77c481197151976dafb2f37ae1652e3ad2ae13583c2839720016c3ca9e9effe305d4fbb743a9b188ab6c7ad2a08096ecfa2b9e4c8d2364998baf954b8ab311ff92c894c5bec269a7fcca1fdbc022ad34b59377cd3d8f127e87d9daca4cff6cb038144b6237c166e5f51cb7417ff698281bf223fef00105550ea55245051d5e6189b242a4cff9d87a34d0c5be4363bf9ae3bb0211ca09902ef09b54dd80098e08a90b7e80d7757efa306c3e1b1fccb519908372b345e3114f66f122c2b85b321bd3bb9a0784db519ab77591bfaadebae05528f8de2c918a33bbb59f7a8832ec77cdf95e097e76cf6597ab2ba7fe845c22d06b29f316e17a89d5f932bfd84f3896dd0b448c2ba4ba83faee5a7e03183d392c7df1df15656dccc86fc50b02026e6a6bcfa848701a634f9aaf08d6e() private {
      c064cd34a6651585ea62dde3ede3ce21e5843f87af475fee892defb85edbd1f5cedfb1e34fb69fd2d3b4369ff4191f17b2a42471fd9fa55f844bac27f879ef48cae8();

      ac0930923d4d608e88d7f860ec09a78314a0ba9311828752c0389dc61f2a947b4e71fa899637b484dd7a96c70c90216a4d6c8e48985e41043a2d05fb310fe389 = uint256(keccak256(abi.encodePacked(
          ac0930923d4d608e88d7f860ec09a78314a0ba9311828752c0389dc61f2a947b4e71fa899637b484dd7a96c70c90216a4d6c8e48985e41043a2d05fb310fe389,
          e012e97f7114e7205d4b962d3ec78a9b3b96bb546861c1bee4dcf9eb4b9357bf16952b82aef8e36f4c10b79570de35acb56bc0f90000b01c82a2537ad77f948(),
          d01ec0140eb8f89c963bba6336989c0b24a51186bebf462be78a2e15307f83739f513dbbdcc79d99340cee2bc44714381db4370c0a96452efe4b9dbf(),
          c714c482d35284b8ba2b19a3f490c816edf0796c61a259d0b1bf447f6952bde754d0423f7f5f988e53e995febde9c5b49e6594c06538d301d20a2(),
          d0c523579daefc6620455edc4fae33f3429606f5335c5b2d6a1f60a7490d35697160e80240815d5f236d08487c830b76(),
          db5586cd3c65c7b170222f6a1182240f10ad3295a1460bc3bbfaf8fc4ed7fb3262c49756c8ef9608e692b23f64a473846fd(),
          f63dace2687a8ac994d251695e39d28f02cfee7b258afa3724ecdf7fd70df952a36360aa0e4a3f60e965a628395aa36dca466e3188b06307f(),
          b1b28ea5a69b51098dc45bbf901bdfbdb8285abe2dd8c25683d83c96d49413c47b06ad1c8bbca975f7f39a4aeaa93da23(),
          ecb5d2832f0125b301e237de12b619f851d380b0c5c9a795fcfcd570a90380ce2e0a5087e64dd59885f57ad334b42176775d43fa07b4d4f8e59393715(),
          d37ae16701a695c417076c0c55170eca07d5f027833daf2c61adc438cfd7270e60b2202ed5dbf866a3a25a64f562de3fba3af85cd985b(),
          fb0dfa972d30b36757f66cd507c3c6ec7aec12d868120628e0ac9a072e1a6c75cfc4563c5db30789bdeecf1(),
          bc8dcc036002169b4b4893e82622fb639fd22ca821c1221fb9856e78baad4fc74037bb7e7ff46385ab0810047acd4a6030890e8d7)));
  }

  function rand(uint256 _range) onlyOwner external returns(uint256) {
      regenerateHash();
      return ac0930923d4d608e88d7f860ec09a78314a0ba9311828752c0389dc61f2a947b4e71fa899637b484dd7a96c70c90216a4d6c8e48985e41043a2d05fb310fe389 % _range;
  }

  function regenerateHash() onlyOwner public {
      A8cf9be874ceefa20f0edbc6d3672c92e058b5703579bf8cc0092763eb913f2eb94b08e0df425f02a0e182335b32c9142f9ad26c6badafcf23f7284f6d600bdde9a08faff17f7f303c1c1063ef141c7aa18c9f8c4d1089397a1005c013c4e165cb55f502c2478b56603768eff9ce17afec7ae4b4e9ef5e7214f11a05382170524d1450d12b38ca252065572b70bd4de9e06afb7ba8d4a45715adde4608ec402358b81b3c2fd2d6cac3acaadbda58b4beb0da4fe77c481197151976dafb2f37ae1652e3ad2ae13583c2839720016c3ca9e9effe305d4fbb743a9b188ab6c7ad2a08096ecfa2b9e4c8d2364998baf954b8ab311ff92c894c5bec269a7fcca1fdbc022ad34b59377cd3d8f127e87d9daca4cff6cb038144b6237c166e5f51cb7417ff698281bf223fef00105550ea55245051d5e6189b242a4cff9d87a34d0c5be4363bf9ae3bb0211ca09902ef09b54dd80098e08a90b7e80d7757efa306c3e1b1fccb519908372b345e3114f66f122c2b85b321bd3bb9a0784db519ab77591bfaadebae05528f8de2c918a33bbb59f7a8832ec77cdf95e097e76cf6597ab2ba7fe845c22d06b29f316e17a89d5f932bfd84f3896dd0b448c2ba4ba83faee5a7e03183d392c7df1df15656dccc86fc50b02026e6a6bcfa848701a634f9aaf08d6e();
  }
}
