# <u>ProgressCircle</u> component for SF LEX

#### Output screen shots:<br/>
![example1](https://user-images.githubusercontent.com/19519479/48674445-114ff380-eb55-11e8-9c29-aa222c9908a0.PNG)
![example2](https://user-images.githubusercontent.com/19519479/48674446-11e88a00-eb55-11e8-966a-958735b6e7a6.PNG)<br/>
![example3](https://user-images.githubusercontent.com/19519479/48674556-32651400-eb56-11e8-9178-797ab0ddc2b7.png)
#### Usage sample
```
<c:ProgressCircle progress="66.66" variant="success">
    <aura:set attribute="tooltip">Tooltip text</aura:set>
</c:ProgressCircle>
```
#### Testing on scratch org 
```
sfdx force:org:create -f config/project-scratch-def.json -a <ScratchOrgName>
sfdx force:source:push -u <ScratchOrgName>
sfdx force:org:open -u <ScratchOrgName>
```
Navigate to tab "<i>Progress Circle Demo</i>" - Voila!